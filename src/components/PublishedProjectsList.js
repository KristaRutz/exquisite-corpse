import React from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Media from "react-bootstrap/Media";
import ProgressBar from "react-bootstrap/ProgressBar";
import ListGroup from "react-bootstrap/ListGroup";
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
import LoadingScreen from "./LoadingScreen";

function PublishedProjectsList(props) {
  const {
    projects,
    handlePublishProject,
    handleDeleteProject,
    handleProjectClick,
  } = props;
  const currentUserId = firebase.auth().currentUser
    ? firebase.auth().currentUser.uid
    : "anonymous";
  if (projects.length < 1) {
    return <Alert variant="primary">No completed projects yet.</Alert>;
  } else {
    return (
      <Container>
        <h1>Published projects</h1>
        <ListGroup>
          {projects
            .filter((project) => project.isPublished)
            .map((project) => (
              <ListGroup.Item key={project.id}>
                <Media>
                  <div>
                    <ListGroup>
                      {project.contributionLimit > project.fragments.length ? (
                        <ListGroup.Item action disabled variant="primary">
                          Publish
                        </ListGroup.Item>
                      ) : (
                        <ListGroup.Item
                          variant="primary"
                          action
                          onClick={() => handlePublishProject(project)}
                        >
                          Publish
                        </ListGroup.Item>
                      )}
                      {currentUserId === project.authorId ||
                      project.authorId === "anonymous" ? (
                        <ListGroup.Item
                          variant="danger"
                          action
                          onClick={() => handleDeleteProject(project)}
                        >
                          Delete
                        </ListGroup.Item>
                      ) : (
                        <ListGroup.Item action disabled variant="danger">
                          Delete
                        </ListGroup.Item>
                      )}
                    </ListGroup>
                  </div>
                  <Media.Body onClick={() => handleProjectClick(project)}>
                    <Container>
                      <h5>{project.title}</h5>
                      {project.timeCreated.toDate() != null ? (
                        <p>
                          Created at{" "}
                          {project.timeCreated.toDate().toLocaleTimeString()}
                        </p>
                      ) : (
                        <></>
                      )}
                      <p className="lead">{project.description}</p>
                      <ProgressBar
                        striped
                        now={
                          (100 / project.contributionLimit) *
                          project.fragments.length
                        }
                      />
                    </Container>
                  </Media.Body>
                </Media>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Container>
    );
  }
}

PublishedProjectsList.propTypes = {
  projects: PropTypes.array,
  handleProjectClick: PropTypes.func,
  handleDeleteProject: PropTypes.func,
  handlePublishProject: PropTypes.func,
};

export default PublishedProjectsList;
