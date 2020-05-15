import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Media from "react-bootstrap/Media";
import ProgressBar from "react-bootstrap/ProgressBar";
import ListGroup from "react-bootstrap/ListGroup";
import { BsCollectionFill } from "react-icons/bs";
// import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";

function Room(props) {
  const { roomId, onSelectRoomClick } = props;
  useFirestoreConnect([{ collection: "projects" }]);
  const projects = useSelector((state) => state.firestore.ordered.projects);

  if (isLoaded(projects)) {
    return (
      <Container>
        <h1 className="display-2">...room</h1>
        <ListGroup>
          {projects.map((project) => (
            <ListGroup.Item>
              <Media>
                <BsCollectionFill style={{ size: 40, margin: "20px" }} />
                <Media.Body>
                  <h5>{project.title}</h5>
                  <p>{project.description}</p>
                  <ProgressBar now={100 / project.fragments.length} />
                </Media.Body>
              </Media>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    );
  } else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    );
  }
}

Room.propTypes = {
  onSelectRoomClick: PropTypes.func,
};

export default Room;
