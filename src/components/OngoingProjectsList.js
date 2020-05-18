import React from "react";
import PropTypes from "prop-types";

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

function OngoingProjectsList(props) {
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
    <Container fluid>
      <ListGroup>
        {projects
          .filter((project) => !project.isPublished)
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
                    <p>
                      Created at{" "}
                      {project.timeCreated.toDate().toLocaleTimeString()}
                    </p>
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

OngoingProjectsList.propTypes = {
  projects: PropTypes.array,
  handleProjectClick: PropTypes.func,
  handleDeleteProject: PropTypes.func,
  handlePublishProject: PropTypes.func,
};

export default OngoingProjectsList;
