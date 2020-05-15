import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Media from "react-bootstrap/Media";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";

function Room(props) {
  const { roomId, onSelectRoomClick } = props;
  useFirestoreConnect([{ collection: "projects" }]);
  const projects = useSelector((state) => state.firestore.ordered.projects);

  const db = useFirestore();

  // db.get({ collection: "projects", doc: projectId }).then((project) => {
  //   const currentProject = {
  //     title: project.get("title"),
  //     isPublished: project.get("isPublished"),
  //     characterLimit: project.get("characterLimit"),
  //     contributionLimit: project.get("contributionLimit"),
  //     timeCreated: project.get("timeCreated"),
  //     fragments: project.get("fragments"),
  //     authors: project.get("authors"),
  //     id: projectId,
  //   };
  // });
  if (isLoaded(projects)) {
    return (
      <Container>
        <h1 className="display-2">Room</h1>
        <Media onClick={() => props.onSelectRoomClick()}>
          <img
            width={64}
            height={64}
            className="align-self-start mr-3"
            src="holder.js/64x64"
            alt="Generic placeholder"
          />
          <Media.Body>
            <h5>Media Heading</h5>
            <p>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
              scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum
              in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
              nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
            </p>

            <p>
              Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel
              eu leo. Cum sociis natoque penatibus et magnis dis parturient
              montes, nascetur ridiculus mus.
            </p>
          </Media.Body>
        </Media>
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
