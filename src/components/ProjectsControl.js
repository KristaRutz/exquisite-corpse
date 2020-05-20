import React, { useState } from "react";
import firebase from "firebase/app";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import CreateProjectForm from "./CreateProjectForm";
import ProjectGallery from "./ProjectGallery";
import ProjectDashboard from "./ProjectDashboard";
import LoadingScreen from "./LoadingScreen";
import ProjectControlMenu from "./ProjectControlMenu";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import sampleProject from "./SampleProject";
import styles from "./styles";

function ProjectsControl(props) {
  const [creatingProject, setCreatingProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // const { roomId, onSelectRoomClick } = props;
  useFirestoreConnect([{ collection: "projects" }]);
  const db = useFirestore();
  const projects = useSelector((state) => state.firestore.ordered.projects);
  // const [showModal, setShowModal] = useState(false);
  // const [currentProject, setCurrentProject] = useState(null);
  // const VIEW_CREATE_A_PROJECT = "view create a project";
  // const VIEW_ROOM = "view room";
  // const VIEW_ADD_CONTRIBUTION_FORM = "view add contribution form";
  // const VIEW_PROJECT_DETAILS = "view project details";
  // const views = [VIEW_ROOM, VIEW_ADD_CONTRIBUTION_FORM, VIEW_PROJECT_DETAILS];
  // const [currentView, setCurrentView] = useState(views[0]);
  // const auth = firebase.auth();
  // const currentUserId = firebase.auth().currentUser
  //   ? firebase.auth().currentUser.uid
  //   : "anonymous";
  // const [key, setKey] = useState("home");
  // console.log(roomId);

  const handleCancelClick = () => {
    setCreatingProject(false);
    setSelectedProject(null);
  };
  const handleSelectProjectClick = () => {
    alert("Clicked!");
    const project = sampleProject; // eventually search by ID and rebuild relevant info
    setSelectedProject(project);
  };

  const handleCreateProjectClick = () => {
    setCreatingProject(true);
  };
  const handleCreateProjectFormSubmission = (project) => {
    setCreatingProject(false);
    alert("project was successfully created!");
  };

  const nullFunction = () => {};

  if (isLoaded(projects)) {
    if (creatingProject) {
      return (
        <CreateProjectForm
          onCreateProjectFormSubmission={handleCreateProjectFormSubmission}
        />
      );
    } else if (selectedProject != null) {
      return <ProjectDashboard project={selectedProject} />;
    } else {
      return (
        <Container>
          <h1 className="display-3" style={styles.headerMargin}>
            Explore
          </h1>
          <Row>
            <Col sm={3}>
              <ProjectControlMenu
                onCreateProjectClick={handleCreateProjectClick}
              />
            </Col>
            <Col sm={9}>
              <ProjectGallery
                onSelectProjectClick={handleSelectProjectClick}
                projects={projects}
                handleDeleteProject={nullFunction}
                handleProjectClick={handleSelectProjectClick}
                handlePublishProject={nullFunction}
              />
            </Col>
          </Row>
        </Container>
      );
    }
  } else {
    return <LoadingScreen />;
  }
}

export default ProjectsControl;
