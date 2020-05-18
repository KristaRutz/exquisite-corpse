import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import LoadingScreen from "./LoadingScreen";
import { StyledFirebaseAuth } from "react-firebaseui";

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "<url-to-redirect-to-on-success>",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // signInOptions: [
  //   {
  //     provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
  //     requireDisplayName: false,
  //   },
  //   {
  //     provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  //     scopes: ["https://www.googleapis.com/auth/contacts.readonly"],
  //     customParameters: {
  //       prompt: "select_account",
  //     },
  //   },
  //   {
  //     provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  //     scopes: ["public_profile", "email", "user_friends"],
  //   },
  // ],
  // Terms of service url.
  tosUrl: "<your-tos-url>",
  // Privacy policy url.
  privacyPolicyUrl: "<your-privacy-policy-url>",
};

const ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start("#firebaseui-auth-container", uiConfig);

if (ui.isPendingRedirect()) {
  ui.start("#firebaseui-auth-container", uiConfig);
}

function LogInForm(props) {
  return (
    <Container>
      <Button onClick={props.onRegisterClick}>Toggle register</Button>
      <h1 className="display-2">Sign in to your account</h1>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">
        <LoadingScreen />
      </div>
    </Container>
  );
}

LogInForm.propTypes = {
  onRegisterClick: PropTypes.func,
};

export default LogInForm;
