import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import firebase from "firebase/app";
import * as firebaseui from "firebaseui";

var ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start("#firebaseui-auth-container", {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
});

if (ui.isPendingRedirect()) {
  ui.start("#firebaseui-auth-container", uiConfig);
}

function LogInForm(props) {
  return (
    <Container>
      <Button onClick={props.onRegisterClick}>Toggle register</Button>
      <h1 className="display-2">Sign in to your account</h1>
      <div id="firebaseui-auth-container"></div>
    </Container>
  );
}

LogInForm.propTypes = {
  onRegisterClick: PropTypes.func,
};

export default LogInForm;
