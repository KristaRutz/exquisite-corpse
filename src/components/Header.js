import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Container,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import { MdVpnKey } from "react-icons/md";
import { Redirect } from "react-router-dom";
import RoomKeyInput from "./RoomKeyInput";

function Header() {
  return (
    <>
      <Navbar
        sticky="top"
        bg="warning"
        expand="lg"
        variant="dark"
        style={styles.navBar}
      >
        <Container>
          <Navbar.Brand href="/">StoryJam</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/new">New Room</Nav.Link>
              <Nav.Link href="/room">Room</Nav.Link>
              <Nav.Link href="/loading">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/account">My Account</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <RoomKeyInput />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

const styles = {
  navBar: {
    opacity: 0.9,
  },
};

export default Header;
