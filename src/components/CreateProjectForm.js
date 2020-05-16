import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import { useFirestore } from "react-redux-firebase";
import firebase from "firebase/app";

function CreateProjectForm(props) {
  const db = useFirestore();

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
      characterLimit: 240,
      contributionLimit: 6,
      timeCreated: db.FieldValue.serverTimestamp(),
      fragments: [],
      authors: [],
      authorId: author,
    };
    console.log(newProject);
    db.collection("projects").add(newProject);
    props.onCreateProjectFormSubmission();
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
            defaultValue="New Project"
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
            placeholder="Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted..."
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
};

export default CreateProjectForm;
