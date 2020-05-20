import React from "react";
import firebase from "firebase/app";
import { isLoaded } from "react-redux-firebase";
import LoadingScreen from "./LoadingScreen";
import AccountSignIn from "./AccountSignIn";
import AccountDetails from "./AccountDetails";
import { useState } from "react";

function AccountControl() {
  const views = ["register", "login", "logged out"];
  const [currentView, setCurrentView] = useState(views[1]);
  const auth = firebase.auth();
  console.log(firebase.auth());
  function handleViewRegister() {
    //setCurrentView(views[0]);
  }
  function handleViewLogIn() {
    setCurrentView(views[1]);
  }
  function handleViewLogOut() {
    setCurrentView(views[1]);
  }

  function doSignOut() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        handleViewLogOut();
        console.log("Successfully signed out!");
        // swal.fire(
        //   'Successfully signed out!',
        // )
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  if (!isLoaded(auth)) {
    return <LoadingScreen />;
  } else if (auth.currentUser != null) {
    return <AccountDetails user={auth.currentUser} onLogOutClick={doSignOut} />;
  } else if (currentView === "login") {
    return <AccountSignIn onRegisterClick={handleViewRegister} />;
  } else if (currentView === "logged out") {
    return <>{/* loggedOutScreen? */}</>;
  }
}

export default AccountControl;
