import React from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useFirestore } from "react-redux-firebase";
import { useState } from "react";
import firebase from "firebase/app";
import "./CreateRoomForm.css";
import { Redirect } from "react-router-dom";

function CreateRoomForm() {
  const db = useFirestore();
  const auth = firebase.auth();
  const [isPublic, setIsPublic] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const defaultRoomName =
    auth.currentUser === null
      ? "New Room"
      : `${auth.currentUser.displayName}'s Room`;

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
    db.collection("rooms")
      .add(newRoom)
      .then(function (docRef) {
        setCurrentRoomId(docRef.id);
        return setRedirect(true);
      })
      .catch(function (error) {
        alert("Error adding document: ", error);
      });
  }
  function RenderRedirect() {
    if (redirect) {
      return <Redirect to={`/room/${currentRoomId}`} />;
    } else return <></>;
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
  function AlertAuthStatus() {
    if (auth.currentUser === null) {
      return (
        <Alert key="no-user-alert" variant="danger">
          You are not logged in! You can still make a room anonymously, but you
          cannot be a room owner, even for private rooms.{" "}
          <Alert.Link href="/account">Sign in</Alert.Link> if you wish to access
          this functionality.
        </Alert>
      );
    }
    return null;
  }
  return (
    <Container>
      <RenderRedirect />
      <h1 className="display-3" style={styles.headerMargin}>
        Create a room
      </h1>
      <AlertAuthStatus />
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
            required
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
};
