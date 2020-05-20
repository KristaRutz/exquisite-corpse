import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase/app";
import Container from "react-bootstrap/Container";
import Media from "react-bootstrap/Media";
import ListGroup from "react-bootstrap/ListGroup";
import ProgressBar from "react-bootstrap/ProgressBar";
import styles from "./styles";

function ProjectGallery(props) {
  const {
    projects,
    handlePublishProject,
    handleDeleteProject,
    handleProjectClick,
  } = props;
  const currentUserId = firebase.auth().currentUser
    ? firebase.auth().currentUser.uid
    : "anonymous";
  return (
    <Container>
      <h1>Project Gallery</h1>
      <ListGroup>
        {projects
          //.filter((project) => project.isPublished)
          .map((project) => (
            <ListGroup.Item key={project.id}>
              <Media>
                <div></div>
                <Media.Body onClick={() => handleProjectClick(project)}>
                  <Container>
                    <h3>{project.title}</h3>
                    <p>
                      <strong
                        className="text-muted mb-3"
                        style={styles.timestampPill}
                      >
                        {project.timeCreated.toDate().toLocaleTimeString()}
                      </strong>{" "}
                      <span className="lead"> {project.description}</span>
                    </p>

                    {project.fragments[0] ? (
                      <p>{project.fragments[0].content.slice(0, 100)}... </p>
                    ) : (
                      <></>
                    )}
                  </Container>
                </Media.Body>
              </Media>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Container>
  );
}

ProjectGallery.propTypes = {
  onSelectProjectClick: PropTypes.func,
  projects: PropTypes.array,
  handleProjectClick: PropTypes.func,
  handleDeleteProject: PropTypes.func,
  handlePublishProject: PropTypes.func,
};

export default ProjectGallery;
