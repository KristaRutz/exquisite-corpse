import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import { useFirestore } from "react-redux-firebase";
import firebase from "firebase/app";

function CreateContributionForm(props) {
  const { project, onCreateContributionFormSubmission } = props;
  const db = useFirestore();
  const projectId = project.id;

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

  function addNewFragmentToFirestore(event) {
    event.preventDefault();
    const author =
      firebase.auth().currentUser != null
        ? firebase.auth().currentUser.uid
        : "anonymous";
    const entry = {
      authorId: author,
      content: event.target.content.value,
      //timeSubmitted: db.FieldValue.serverTimestamp(),
    };
    console.log(entry);
    db.collection("projects")
      .doc(projectId)
      .update({
        fragments: [...project.fragments, entry],
        authors: project.authors.includes(author)
          ? project.authors
          : [...project.authors, author],
      });
    onCreateContributionFormSubmission();
  }

  return (
    <Container>
      <h1 className="display-4" style={styles.headerMargin}>
        Contribute to <em>{project.title}</em>
      </h1>
      {project.fragments.length > 0 ? (
        <>
          <h2 style={styles.headerMargin}>The story so far...</h2>
          <p>Here's what others have contributed!</p>
        </>
      ) : (
        <></>
      )}
      <Accordion defaultActiveKey="0">
        {project.fragments.map((fragment, index) => {
          if (index === project.fragments.length - 1) {
            return (
              <Card key={index}>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <h5>
                    Part {index + 1}, by {fragment.authorId}
                  </h5>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>{fragment.content}</Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          } else {
            return (
              <Card key={index} bg="light" text="muted">
                <Card.Header>
                  <h5>
                    Part {index + 1}, by {fragment.authorId}
                  </h5>
                </Card.Header>
              </Card>
            );
          }
        })}
      </Accordion>
      <Form onSubmit={addNewFragmentToFirestore}>
        <h2 style={styles.headerMargin}>Part {project.fragments.length + 1}</h2>
        <Form.Group>
          <Form.Label>
            Add the next part of the StoryJam! ({project.characterLimit}{" "}
            characters)
          </Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            rows="4"
            maxlength={project.characterLimit}
            placeholder="Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted..."
            required
          />
          <Form.Text className="text-muted">
            <strong>
              The creator of this project gave this description to guide
              contributions
            </strong>
            : {project.description}
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox"></Form.Group>
        <Button variant="warning" type="submit">
          Jam!
        </Button>
      </Form>
    </Container>
  );
}

const styles = {
  headerMargin: {
    marginTop: "1em",
  },
};

CreateContributionForm.propTypes = {
  onCreateContributionFormSubmission: PropTypes.func,
  projectId: PropTypes.string,
  project: PropTypes.object,
};

export default CreateContributionForm;
