import React from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";

function CreateProjectForm(props) {
  return (
    <Container>
      <h1>Begin a new project</h1>
      <hr />
      <Form onSubmit={() => props.onCreateProjectFormSubmission()}>
        <Form.Group>
          <Form.Label>Working Title</Form.Label>
          <Form.Control type="text" placeholder="Give your project a title" />
          <Form.Text className="text-muted">
            This title will be visible to contributors, and it can be changed
            later.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted..."
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox"></Form.Group>
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
