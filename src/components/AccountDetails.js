import React from "react";
import firebase from "firebase/app";
import { isLoaded } from "react-redux-firebase";
import LoadingScreen from "./LoadingScreen";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import { useState } from "react";

function AccountDetails(props) {
  const { user } = props;
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
      </Container>
    );
  }
}

AccountDetails.propTypes = {
  user: PropTypes.object,
};

export default AccountDetails;
