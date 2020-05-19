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
import { useSelector } from "react-redux";
import "./CreateRoomForm.css";

function CreateRoomForm() {
  const db = useFirestore();
  const auth = firebase.auth();
  //const profile = useSelector(({ firebase: { profile } }) => profile);
  const profile = useSelector((state) => state.firebase.profile);
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
      description: event.target.description.value,
      isPublic: isPublic,
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

  function TitleVisibilityMessage() {
    if (isPublic) {
      return (
        <Form.Text className="text-muted">
          This title will be visible to all.
        </Form.Text>
      );
    } else {
      return (
        <Form.Text className="text-muted">
          This title will be visible to contributors.
        </Form.Text>
      );
    }
  }
  function PrivacySettingsMessage() {
    if (isPublic && auth.currentUser != null) {
      return (
        <Form.Text className="text-muted">
          By making this room public, anyone will be able to contribute, and you
          won't be the room owner.
        </Form.Text>
      );
    } else if (auth.currentUser != null) {
      return (
        <Form.Text className="text-muted">
          By keeping this room private, only those with the link will be able to
          contribute, and you will be the room owner.
        </Form.Text>
      );
    } else if (isPublic) {
      return (
        <Form.Text className="text-muted">
          By making this room public, anyone will be able to contribute.
        </Form.Text>
      );
    } else {
      return (
        <Form.Text className="text-muted">
          By keeping this room private, only those with the link will be able to
          contribute.
        </Form.Text>
      );
    }
  }

  const defaultRoomName =
    auth.currentUser === null
      ? "New Room"
      : `${auth.currentUser.displayName}'s Room`;
  return (
    <Container>
      <h1 className="display-3" style={styles.headerMargin}>
        Create a room
      </h1>
      <Form onSubmit={handleAddingRoomToFirestore}>
        <Form.Group>
          <Form.Label>Make this room public?</Form.Label>
          <Form.Text>
            <label class="switch">
              <input
                type="checkbox"
                name="isPublic"
                onChange={() => setIsPublic(!isPublic)}
              />
              <span class="slider round"></span>
            </label>
          </Form.Text>
          <PrivacySettingsMessage />
        </Form.Group>

        <Form.Group>
          <Form.Label>Room Name</Form.Label>
          <Form.Control
            type="text"
            name="roomName"
            defaultValue={defaultRoomName}
          />
          <TitleVisibilityMessage />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            maxlength="240"
            placeholder="Optionally use this area to provide details on the specific structure of projects and contributions. For example, ask students to title new projects with their first and last name."
          />
        </Form.Group>

        <Button type="submit" variant="warning">
          Get shareable link
        </Button>
      </Form>
    </Container>
  );
}

export default CreateRoomForm;

const styles = {
  headerMargin: {
    marginTop: "1em",
  },
  switch: {
    position: "relative",
    display: "inline-block",
    width: 60,
    height: 34,
    input: {
      opacity: 0,
      width: 0,
      height: 0,
    },
  },
};
