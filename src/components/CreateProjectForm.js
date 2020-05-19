import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import { useFirestore } from "react-redux-firebase";
import firebase from "firebase/app";

function CreateProjectForm(props) {
  const db = useFirestore();
  const { onCreateProjectFormSubmission, roomId } = props;

  function addNewProjectToFirestore(event) {
    event.preventDefault();
    const author =
      firebase.auth().currentUser != null
        ? firebase.auth().currentUser.uid
        : "anonymous";
    const newProject = {
      title: event.target.title.value,
      description: event.target.description.value,
      isPublished: false,
      characterLimit: 360,
      contributionLimit: 6,
      timeCreated: db.FieldValue.serverTimestamp(),
      fragments: [],
      authors: [],
      authorId: author,
      roomId,
      // isPrivate/Public?
    };
    console.log(newProject);
    db.collection("projects").add(newProject);
    onCreateProjectFormSubmission();
  }

  return (
    <Container>
      <h1>Begin a new project</h1>
      <hr />
      <Form onSubmit={addNewProjectToFirestore}>
        <Form.Group>
          <Form.Label>Working Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            defaultValue="My Project"
            placeholder="Give your project a title"
          />
          <Form.Text className="text-muted">
            This title will be visible to contributors, and it can be changed
            later.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            maxLength="240"
            placeholder="Optionally use this area to provide details on the specific structure of contributions. For example, describe a preferred meter when creating poetry."
          />
        </Form.Group>
        <Button variant="warning" type="submit">
          Create
        </Button>
      </Form>
    </Container>
  );
}

CreateProjectForm.propTypes = {
  onCreateProjectFormSubmission: PropTypes.func,
  roomId: PropTypes.string,
};

export default CreateProjectForm;
