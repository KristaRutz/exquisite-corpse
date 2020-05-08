import React from "react";
import Container from "react-bootstrap/Container";
import NavBar from "react-bootstrap/NavBar";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function Header() {
  return (
    <Container>
      <NavBar className="dark">
        <ButtonGroup>
          <Button>Home</Button>
          <Button>Sign In/Register</Button>
        </ButtonGroup>
      </NavBar>
    </Container>
  );
}

export default Header;
