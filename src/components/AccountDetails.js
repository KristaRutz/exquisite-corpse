import React from "react";
import firebase from "firebase/app";
import { isLoaded } from "react-redux-firebase";
import LoadingScreen from "./LoadingScreen";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useState } from "react";

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
        <h1 className="display-2">Account Details</h1>
        <p>{user.displayName}</p>
        <p>{user.uid}</p>
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
