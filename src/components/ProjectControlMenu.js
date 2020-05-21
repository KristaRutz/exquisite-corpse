import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import Nav from "react-bootstrap/Nav";

function ProjectControlMenu(props) {
  return (
    <Container fluid>
      <br />
      <Container>
        <p>Contribute</p>
        <Nav variant="pills" className="flex-column">
          <Nav.Item>
            <Nav.Link href="/new">Create a room</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/room">Enter the commons</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
      <hr />
      <Container>
        <p>Account</p>
        <Nav variant="pills" className="flex-column">
          <Nav.Item>
            <Nav.Link eventKey="/account">Account Settings</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
      <hr />
    </Container>
  );
}

ProjectControlMenu.propTypes = {
  onCreateProjectClick: PropTypes.func,
};

export default ProjectControlMenu;
