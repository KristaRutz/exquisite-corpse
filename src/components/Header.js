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
              <Nav.Link href="/new">New Room +</Nav.Link>
              <Nav.Link href="/room">Commons</Nav.Link>
              {/* <Nav.Link href="/loading">Link</Nav.Link> */}
              {/* <NavDropdown title="Rooms" id="basic-nav-dropdown">
                <NavDropdown.Item href="/room/commons">
                  Common Room
                </NavDropdown.Item>
                <NavDropdown.Item href="/new">New Room</NavDropdown.Item>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/account">My Rooms</NavDropdown.Item>
              </NavDropdown> */}
              <Nav.Link href="/account">Account</Nav.Link>
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
    opacity: 0.95,
  },
};

export default Header;
