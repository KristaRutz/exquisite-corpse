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

function Room(props) {
  const { roomId, onSelectRoomClick } = props;
  useFirestoreConnect([{ collection: "projects" }]);
  const db = useFirestore();
  const projects = useSelector((state) => state.firestore.ordered.projects);
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

  if (isLoaded(projects) && isLoaded(auth)) {
    if (currentView === views[1] && currentProject != null) {
      return (
        <CreateContributionForm
          project={currentProject}
          onCreateContributionFormSubmission={handleClose}
        />
      );
    }
    if (currentView === views[2] && currentProject != null) {
      return (
        <ProjectDetails
          project={currentProject}
          onBackToRoomClick={handleClose}
        />
      );
    } else {
      return (
        <>
          <Container>
            <h1 className="display-2">...room</h1>
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
                          onCreateProjectFormSubmission={
                            handleCreateProjectFormSubmission
                          }
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="first">
                        <h1>Header 1</h1>
                        <OngoingProjectsList
                          projects={projects}
                          handleDeleteProject={handleDeleteProject}
                          handleProjectClick={handleProjectClick}
                          handlePublishProject={handlePublishProject}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <h1>Header 2</h1>
                        <PublishedProjectsList
                          projects={projects}
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
            {/* <Container>
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
              >
                <Tab eventKey="home" title="Home">
                  <OngoingProjectsList
                    projects={projects}
                    handleDeleteProject={handleDeleteProject}
                    handleProjectClick={handleProjectClick}
                    handlePublishProject={handlePublishProject}
                  />
                </Tab>
                <Tab eventKey="profile" title="Profile">
                  <PublishedProjectsList
                    projects={projects}
                    handleDeleteProject={handleDeleteProject}
                    handleProjectClick={handleProjectClick}
                    handlePublishProject={handlePublishProject}
                  />
                </Tab>
                <Tab eventKey="contact" title="Contact">
                  <h1>tab 3</h1>
                </Tab>
              </Tabs>
            </Container> */}
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
    return (
      // <React.Fragment>
      //   <h3>Loading...</h3>
      // </React.Fragment>
      <LoadingScreen />
    );
  }
}

Room.propTypes = {
  roomId: PropTypes.string,
  //onSelectRoomClick: PropTypes.func,
};

export default Room;
