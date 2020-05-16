import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Media from "react-bootstrap/Media";
import ProgressBar from "react-bootstrap/ProgressBar";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { BsCollectionFill } from "react-icons/bs";
// import { useFirestore } from "react-redux-firebase";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import CreateContributionForm from "./CreateContributionForm";

function Room(props) {
  const { roomId, onSelectRoomClick } = props;
  useFirestoreConnect([{ collection: "projects" }]);
  const projects = useSelector((state) => state.firestore.ordered.projects);
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const views = ["room", "add contribution"];
  const [currentView, setCurrentView] = useState(views[0]);

  function handleProjectClick(project) {
    setCurrentProject(project);
    setShowModal(true);
  }
  const handleClose = () => {
    setShowModal(false);
    setCurrentProject(null);
  };
  function handleOkayClick() {
    setShowModal(false);
    setCurrentView(views[1]);
  }

  if (isLoaded(projects)) {
    if (currentView === views[1] && currentProject != null) {
      return (
        <CreateContributionForm
          project={currentProject}
          onCreateContributionFormSubmission={handleClose}
        />
      );
    } else {
      return (
        <>
          <Container>
            <h1 className="display-2">...room</h1>
            <ListGroup>
              {projects.map((project) => (
                <ListGroup.Item onClick={() => handleProjectClick(project)}>
                  <Media>
                    <BsCollectionFill style={{ size: 40, margin: "20px" }} />
                    <Media.Body>
                      <h5>{project.title}</h5>
                      <p>{project.description}</p>
                      <ProgressBar
                        now={
                          (100 / project.contributionLimit) *
                          project.fragments.length
                        }
                      />
                    </Media.Body>
                  </Media>
                </ListGroup.Item>
              ))}
            </ListGroup>
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
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    );
  }
}

Room.propTypes = {
  roomId: PropTypes.string,
  //onSelectRoomClick: PropTypes.func,
};

export default Room;
