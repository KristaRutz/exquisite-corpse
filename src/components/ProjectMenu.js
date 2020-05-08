import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function ProjectMenu() {
  const [hidden, setHidden] = useState(true);
  const handleClick = () => {
    alert("attempted to create a new project!");
  };

  return (
    <Container fluid>
      {hidden ? (
        <h4>Menu</h4>
      ) : (
        <Button onClick={handleClick}>New Project</Button>
      )}
      <br />
      <Button onClick={() => setHidden(!hidden)}>Hide/Show</Button>
    </Container>
  );
}

export default ProjectMenu;
