import React from "react";
import firebase from "firebase/app";
import { isLoaded } from "react-redux-firebase";
import LoadingScreen from "./LoadingScreen";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";

function AccountDetails(props) {
  const { user, onLogOutClick } = props;
  const views = ["register", "login", "logged out", "account details"];
  const [currentView, setCurrentView] = useState(views[0]);
  const auth = firebase.auth();

  if (!isLoaded(auth)) {
    return <LoadingScreen />;
  } else {
    return (
      <Container>
        <h1 className="display-2">My Account</h1>
        <img src={user.photoUrl}></img>
        <Form>
          <FormGroup>
            <Form.Label for="displayName">Display Name</Form.Label>
            <FormControl
              name="displayName"
              value={`${user.displayName}`}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Form.Label for="email">Email</Form.Label>
            <FormControl name="email" value={`${user.email}`} disabled />
          </FormGroup>
          <p>{user.uid}</p>
        </Form>
        <Button onClick={onLogOutClick} variant="danger">
          Sign Out
        </Button>
      </Container>
    );
  }
}

AccountDetails.propTypes = {
  user: PropTypes.object,
  onLogOutClick: PropTypes.func,
};

export default AccountDetails;
