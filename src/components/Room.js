import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Media from "react-bootstrap/Media";
import ProgressBar from "react-bootstrap/ProgressBar";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { BsCollectionFill } from "react-icons/bs";
import firebase from "firebase/app";
import { useFirestore } from "react-redux-firebase";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import CreateContributionForm from "./CreateContributionForm";
import ProjectDetails from "./ProjectDetails";
import OngoingProjectsList from "./OngoingProjectsList";
import PublishedProjectsList from "./PublishedProjectsList";
import LoadingScreen from "./LoadingScreen";
import CreateProjectForm from "./CreateProjectForm";
import { useRouteMatch } from "react-router-dom";
import RoomKeyInput from "./RoomKeyInput";
import RoomMemberList from "./RoomMemberList";

const VIEW_CREATE_A_PROJECT = "VIEW_CREATE_A_PROJECT";
const VIEW_ROOM = "VIEW_ROOM";
const VIEW_LEAVE_ROOM = "VIEW_LEAVE_ROOM";
const VIEW_MEMBERS = "VIEW_MEMBERS";
const VIEW_ADD_CONTRIBUTION_FORM = "VIEW_ADD_CONTRIBUTION_FORM";
const VIEW_PROJECT_DETAILS = "VIEW_PROJECT_DETAILS";
const VIEW_PUBLISHED_PROJECTS = "VIEW_PUBLISHED_PROJECTS";
const VIEW_ONGOING_PROJECTS = "VIEW_ONGOING_PROJECTS";

function Room(props) {
  const { roomId, onSelectRoomClick } = props;

  const auth = firebase.auth();
  const currentUserId = firebase.auth().currentUser
    ? firebase.auth().currentUser.uid
    : "anonymous";

  const db = useFirestore();
  const roomRef = db.collection("rooms").doc(roomId);
  const projects = useSelector((state) => state.firestore.ordered.projects);
  const currentRoomObject = useSelector(
    ({ firestore: { data } }) => data.rooms && data.rooms[roomId]
  );

  const [room, setRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentView, setCurrentView] = useState(VIEW_ROOM);
  const [key, setKey] = useState("home");
  const [showRoomOverview, setShowRoomOverview] = useState(true);

  useFirestoreConnect([
    { collection: "projects" },
    { collection: "rooms", doc: roomId },
  ]);

  function handleProjectClick(project) {
    setCurrentProject(project);
    if (project.isPublished) {
      setCurrentView(VIEW_PROJECT_DETAILS);
    } else {
      setShowModal(true);
    }
  }
  const handleClose = () => {
    setShowModal(false);
    setCurrentProject(null);
  };
  function handleOkayClick() {
    setShowModal(false);
    setCurrentView(VIEW_ADD_CONTRIBUTION_FORM);
    setKey(VIEW_PROJECT_DETAILS);
  }
  function handleCreateProjectFormSubmission() {
    alert("project was successfully created!");
    setCurrentView(VIEW_ROOM);
  }
  function handlePublishProject(project) {
    db.collection("projects").doc(project.id).update({ isPublished: true });
  }
  function handleDeleteProject(project) {
    db.collection("projects").doc(project.id).delete();
  }
  function handleJoinClick() {
    if (auth.currentUser != null) {
      const memberObject = {
        id: currentUserId,
        displayName: auth.currentUser
          ? auth.currentUser.displayName
          : "Anonymous User",
      };
      const isAlreadyMember =
        currentRoomObject.members.filter(
          (member) => member.id === memberObject.id
        ).length > 0
          ? true
          : false;
      if (!isAlreadyMember) {
        const newMemberList = [...currentRoomObject.members, memberObject];
        roomRef.update({ members: newMemberList });
      }
    }
    setShowRoomOverview(false);
  }
  function handleLeaveClick() {
    if (auth.currentUser != null) {
      const editedMemberList = currentRoomObject.members.filter(
        (member) => member.id != currentUserId
      );
      roomRef.update({ members: editedMemberList });
    }
  }
  function RoomOverview() {
    if (
      showRoomOverview &&
      !currentRoomObject.members.includes(currentUserId)
    ) {
      return (
        <>
          <Modal
            show={() => setShowRoomOverview(true)}
            onHide={() => setShowRoomOverview(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Welcome to the room!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Room #{roomId}</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleJoinClick}>
                Join
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    } else {
      return <></>;
    }
  }

  if (isLoaded(projects) && isLoaded(auth) && isLoaded(currentRoomObject)) {
    console.log(room);
    const roomProjects = projects.filter(
      (project) => project.roomId === roomId
    );
    if (currentView === VIEW_ADD_CONTRIBUTION_FORM && currentProject != null) {
      return (
        <CreateContributionForm
          project={currentProject}
          onCreateContributionFormSubmission={handleClose}
        />
      );
    } else if (currentView === VIEW_PROJECT_DETAILS && currentProject != null) {
      return (
        <ProjectDetails
          project={currentProject}
          onBackToRoomClick={handleClose}
        />
      );
    } else {
      return (
        <>
          <RoomOverview />
          <Container>
            <h1 className="display-2">Room</h1>
            {/* <RoomKeyInput /> */}
            <Tab.Container defaultActiveKey="first">
              <Row>
                <Col sm={3}>
                  <Container>
                    <p>Projects</p>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey={VIEW_CREATE_A_PROJECT}>
                          Create a Project
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey={VIEW_ONGOING_PROJECTS}>
                          Ongoing Projects
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey={VIEW_PUBLISHED_PROJECTS}>
                          Published Projects
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Container>
                  <hr />
                  <Container>
                    <p>Room Settings</p>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey={VIEW_MEMBERS}>
                          View Members
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link onClick={handleJoinClick}>Join Room</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link onClick={handleLeaveClick}>
                          Leave Room
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Container>
                  <hr />
                </Col>
                <Col sm={9}>
                  <Container>
                    <Tab.Content>
                      <Tab.Pane eventKey={VIEW_CREATE_A_PROJECT}>
                        <CreateProjectForm
                          roomId={roomId}
                          onCreateProjectFormSubmission={
                            handleCreateProjectFormSubmission
                          }
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey={VIEW_ONGOING_PROJECTS}>
                        <h1>Header 1</h1>
                        <OngoingProjectsList
                          projects={roomProjects}
                          handleDeleteProject={handleDeleteProject}
                          handleProjectClick={handleProjectClick}
                          handlePublishProject={handlePublishProject}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey={VIEW_PUBLISHED_PROJECTS}>
                        <h1>Header 2</h1>
                        <PublishedProjectsList
                          projects={roomProjects}
                          handleDeleteProject={handleDeleteProject}
                          handleProjectClick={handleProjectClick}
                          handlePublishProject={handlePublishProject}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey={VIEW_MEMBERS}>
                        <h1>Room Members</h1>
                        <RoomMemberList
                          memberList={currentRoomObject.members}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey={VIEW_PROJECT_DETAILS}>
                        {currentProject != null ? (
                          <>
                            <h1>Project Details</h1>
                            <ProjectDetails
                              project={currentProject}
                              onBackToRoomClick={handleClose}
                            />
                          </>
                        ) : (
                          <p>null</p>
                        )}
                      </Tab.Pane>
                    </Tab.Content>
                  </Container>
                </Col>
              </Row>
            </Tab.Container>
          </Container>

          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                Contribute to{" "}
                <em>
                  {currentProject != null
                    ? currentProject.title
                    : "this project"}
                </em>
                ?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              You'll be able to see the most recent addition to this project and
              have a few minutes to add your contribution.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleOkayClick}>
                Okay
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  } else {
    return <LoadingScreen />;
  }
}

Room.propTypes = {
  roomId: PropTypes.string,
};

export default Room;
