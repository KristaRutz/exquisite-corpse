import React, { useState } from "react";
import firebase from "firebase/app";
import { isLoaded } from "react-redux-firebase";
import LoadingScreen from "./LoadingScreen";
import AccountSignIn from "./AccountSignIn";
import AccountDetails from "./AccountDetails";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

function AccountControl() {
  const VIEW_ACCOUNT_SIGNIN = "view account signin";
  const VIEW_SIGNED_OUT = "view signed out";
  const [currentView, setCurrentView] = useState(VIEW_ACCOUNT_SIGNIN);
  const auth = firebase.auth();
  console.log(firebase.auth());

  function handleViewLogIn() {
    setCurrentView(VIEW_ACCOUNT_SIGNIN);
  }

  function doSignOut() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setCurrentView(VIEW_SIGNED_OUT);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  if (!isLoaded(auth)) {
    return <LoadingScreen />;
  } else if (currentView === VIEW_SIGNED_OUT) {
    return (
      <>
        <Container>
          <br />
          <Alert variant="primary">You've successfully signed out!</Alert>
        </Container>
        <AccountSignIn />
      </>
    );
  } else if (auth.currentUser != null) {
    return <AccountDetails user={auth.currentUser} onLogOutClick={doSignOut} />;
  } else {
    return <AccountSignIn />;
  }
}

export default AccountControl;
