import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

function ProjectControlMenu(props) {
  const [hidden, setHidden] = useState(true);

  return (
    <Container fluid>
      {hidden ? (
        <h4>Menu</h4>
      ) : (
        <Button onClick={() => props.onCreateProjectClick()}>
          New Project
        </Button>
      )}
      <br />
      <Button onClick={() => setHidden(!hidden)}>Hide/Show</Button>
    </Container>
  );
}

ProjectControlMenu.propTypes = {
  onCreateProjectClick: PropTypes.func,
};

export default ProjectControlMenu;
