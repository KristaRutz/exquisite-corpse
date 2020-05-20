import React from "react";
import styles from "./styles/styles";
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
        expand="xs"
        bg="light"
        variant="light"
        style={styles.navbar}
      >
        <Container>
          <Navbar.Brand href="/">StoryJam</Navbar.Brand>
        </Container>
        <Container>
          <Nav className="justify-content-between">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="https://github.com/KristaRutz/story-jam">
              Fork from GitHub
            </Nav.Link>
            <Nav.Link href="https://github.com/KristaRutz/story-jam/blob/master/LICENSE">
              &copy; 2020 Krista Rutz
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Footer;
