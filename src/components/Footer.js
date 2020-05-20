import React from "react";
import styles from "./styles";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Footer() {
  return (
    <>
      <Navbar
        sticky="bottom"
        bg="light"
        expand="lg"
        variant="light"
        style={styles.navbar}
      >
        <Container fluid>
          <Navbar.Brand href="/">StoryJam</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-between">
              <Nav.Link href="/new">New Room</Nav.Link>
              <Nav.Link href="/room">Room</Nav.Link>
              <Nav.Link href="/loading">Link</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Footer;
