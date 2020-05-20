import React from "react";
import Container from "react-bootstrap/Container";
import firebase from "firebase";
import styles from "./styles/styles";
import "./styles/firebaseui-styling.global.css";
//import * as firebaseui from "firebaseui";
import LoadingScreen from "./LoadingScreen";
import FirebaseAuth from "react-firebaseui/FirebaseAuth";

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      return true;
    },
    uiShown: function () {
      document.getElementById("loader").style.display = "none";
    },
  },
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
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

function AccountSignIn() {
  return (
    <Container>
      <h1 className="display-3" style={styles.headerMargin}>
        Sign in to start
      </h1>
      <hr />
      <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      <div id="loader">
        <LoadingScreen />
      </div>
    </Container>
  );
}

export default AccountSignIn;
