import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import { useFirestore } from "react-redux-firebase";
import { useState } from "react";
import { isLoaded } from "react-redux-firebase";
import LoadingScreen from "./LoadingScreen";
import firebase from "firebase/app";

function CreateRoomForm() {
  const db = useFirestore();
  const auth = firebase.auth();
  const [isPublic, setIsPublic] = useState(false);
  const [members, setMembers] = useState([]);

  function handleAddingRoomToFirestore(event) {
    event.preventDefault();
    const owner = isPublic
      ? "anonymous"
      : auth.currentUser != null
      ? auth.currentUser.uid
      : "anonymous";
    const newRoom = {
      roomName: event.target.roomName.value,
      // description: event.target.description.value,
      isPublic: false,
      isLocked: false,
      isClosed: false,
      members: [],
      ownerId: owner,
      timeCreated: db.FieldValue.serverTimestamp(),
    };
    console.log(newRoom);
    db.collection("rooms").add(newRoom);
    //props.onCreateRoomFormSubmission();
  }

  if (isLoaded(auth)) {
    console.log(auth.currentUser);
    const defaultRoomName = auth.currentUser.isAnonymous
      ? "New Room"
      : `${auth.currentUser.displayName}'s room`;
    return (
      <Container>
        <h1 className="display-3" style={styles.headerMargin}>
          Create your room
        </h1>
        <Form onSubmit={handleAddingRoomToFirestore}>
          <Form.Group>
            <Form.Label>Room Name</Form.Label>
            <Form.Control
              type="text"
              name="roomName"
              defaultValue={defaultRoomName}
              //placeholder={`${currentUser.displayName}`}
            />
            <Form.Text className="text-muted">
              This title will be visible to contributors.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Make this room public?</Form.Label>
            <Form.Control
              type="text"
              name="roomName"
              defaultValue="My Project"
              //placeholder={`${currentUser.displayName}`}
            />
            <Form.Text className="text-muted">
              This title will be visible to contributors.
            </Form.Text>
          </Form.Group>

          {/* <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              maxlength="240"
              placeholder="Optionally use this area to provide details on the specific structure of contributions. For example, describe a preferred meter when creating poetry."
            />
          </Form.Group> */}
          <Button type="submit" variant="warning">
            Create
          </Button>
        </Form>
      </Container>
    );
  } else {
    return <LoadingScreen />;
  }
}

export default CreateRoomForm;

const styles = {
  headerMargin: {
    marginTop: "1em",
  },
};
