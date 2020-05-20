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

function Room(props) {
  const { roomId, onSelectRoomClick } = props;
  useFirestoreConnect([
    { collection: "projects" },
    { collection: "rooms", doc: roomId },
  ]);
  const db = useFirestore();
  const projects = useSelector((state) => state.firestore.ordered.projects);
  //db.get({ collection: "rooms", doc: roomId });
  //const room = useSelector(({ firestore: { data } }) => data.rooms[roomId]);
  const roomRef = db.collection("rooms").doc(roomId);
  const [room, setRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const VIEW_CREATE_A_PROJECT = "view create a project";
  const VIEW_ROOM = "view room";
  const VIEW_ADD_CONTRIBUTION_FORM = "view add contribution form";
  const VIEW_PROJECT_DETAILS = "view project details";
  const views = [VIEW_ROOM, VIEW_ADD_CONTRIBUTION_FORM, VIEW_PROJECT_DETAILS];
  const [currentView, setCurrentView] = useState(views[0]);
  const auth = firebase.auth();
  const currentUserId = firebase.auth().currentUser
    ? firebase.auth().currentUser.uid
    : "anonymous";
  const [key, setKey] = useState("home");

  const [showRoomOverview, setShowRoomOverview] = useState(true);
  console.log(roomId);

  function handleProjectClick(project) {
    setCurrentProject(project);
    if (project.isPublished) {
      setCurrentView(views[2]);
    } else {
      setShowModal(true);
    }
  }
  const handleClose = () => {
    setShowModal(false);
    setCurrentProject(null);
  };
  // function handleProjectDetailsClick() {
  //   return (
  //     <ProjectDetails
  //       project={currentProject}
  //       onBackToRoomClick={handleClose}
  //     />
  //   );
  // }
  function handleOkayClick() {
    setShowModal(false);
    //setCurrentView(views[1]);
    setCurrentView(views[1]);
    setKey(VIEW_PROJECT_DETAILS);
  }
  function handleCreateProjectFormSubmission() {
    alert("project was successfully created!");
    setCurrentView(views[0]);
  }
  function handlePublishProject(project) {
    db.collection("projects").doc(project.id).update({ isPublished: true });
  }
  function handleDeleteProject(project) {
    db.collection("projects").doc(project.id).delete();
  }
  function handleJoinClick() {
    alert("you joined the room!");
    setShowRoomOverview(false);
  }

  function RoomOverview() {
    if (showRoomOverview) {
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

  function checkDocExistence() {
    roomRef.get().then((docSnapshot) => {
      console.log(docSnapshot);
      if (docSnapshot.exists) {
        roomRef.onSnapshot((doc) => {
          setRoom(doc);
        });
        return true;
      } else {
        return false;
      }
    });
  }

  if (isLoaded(projects) && isLoaded(auth)) {
    console.log(room);
    const roomProjects = projects.filter(
      (project) => project.roomId === roomId
    );
    if (currentView === views[1] && currentProject != null) {
      return (
        <CreateContributionForm
          project={currentProject}
          onCreateContributionFormSubmission={handleClose}
        />
      );
    } else if (currentView === views[2] && currentProject != null) {
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
            <h1 className="display-2">...room</h1>
            {/* <RoomKeyInput /> */}
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={3}>
                  {/* <hr /> */}

                  <Container>
                    <p>Projects</p>

                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey={VIEW_CREATE_A_PROJECT}>
                          Create a Project
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="first">Ongoing Projects</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">
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
                        <Nav.Link eventKey="1">View Members</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="2">Leave Room</Nav.Link>
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
                      <Tab.Pane eventKey="first">
                        <h1>Header 1</h1>
                        <OngoingProjectsList
                          projects={roomProjects}
                          handleDeleteProject={handleDeleteProject}
                          handleProjectClick={handleProjectClick}
                          handlePublishProject={handlePublishProject}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <h1>Header 2</h1>
                        <PublishedProjectsList
                          projects={roomProjects}
                          handleDeleteProject={handleDeleteProject}
                          handleProjectClick={handleProjectClick}
                          handlePublishProject={handlePublishProject}
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
  //onSelectRoomClick: PropTypes.func,
};

export default Room;
