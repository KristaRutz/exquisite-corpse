import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import { useFirestore } from "react-redux-firebase";
import firebase from "firebase/app";

function CreateContributionForm(props) {
  const { project, onCreateContributionFormSubmission } = props;
  const db = useFirestore();
  const projectId = project.id;

  db.get({ collection: "projects", doc: projectId }).then((project) => {
    const currentProject = {
      title: project.get("title"),
      isPublished: project.get("isPublished"),
      characterLimit: project.get("characterLimit"),
      contributionLimit: project.get("contributionLimit"),
      timeCreated: project.get("timeCreated"),
      fragments: project.get("fragments"),
      authors: project.get("authors"),
      id: projectId,
    };
  });

  function addNewFragmentToFirestore(event) {
    event.preventDefault();
    let placeholderId;
    const entry = {
      authorId:
        firebase.auth().currentUser != null
          ? firebase.auth().currentUser.uid
          : "anonymous",
      content: event.target.content.value,
      //timeSubmitted: db.FieldValue.serverTimestamp(),
    };
    console.log(entry);
    db.collection("projects")
      .doc(projectId)
      .update({ fragments: [...project.fragments, entry] });
    onCreateContributionFormSubmission();
  }

  return (
    <Container>
      <h1>Contribute to the story</h1>
      <hr />
      <Form onSubmit={addNewFragmentToFirestore}>
        {/* <Form.Group>
          <Form.Label>Working Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Give your project a title"
          />
          <Form.Text className="text-muted">
            This title will be visible to contributors, and it can be changed
            later.
          </Form.Text>
        </Form.Group> */}

        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            placeholder="Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted..."
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox"></Form.Group>
        <Button variant="warning" type="submit">
          Jam!
        </Button>
      </Form>
    </Container>
  );
}

CreateContributionForm.propTypes = {
  onCreateContributionFormSubmission: PropTypes.func,
  projectId: PropTypes.string,
  project: PropTypes.object,
};

export default CreateContributionForm;
