import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { BsCollectionFill } from "react-icons/bs";
import firebase from "firebase/app";
import { useFirestore } from "react-redux-firebase";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import CreateContributionForm from "./CreateContributionForm";
import ProjectDetails from "./ProjectDetails";
import Room from "./Room";
import LoadingScreen from "./LoadingScreen";
import CreateProjectForm from "./CreateProjectForm";
import { useRouteMatch } from "react-router-dom";
import RoomKeyInput from "./RoomKeyInput";

function RoomControl(props) {
  const { roomId, onSelectRoomClick } = props;
  useFirestoreConnect([
    { collection: "projects" },
    { collection: "rooms", doc: roomId },
  ]);
  const db = useFirestore();
  const projects = useSelector((state) => state.firestore.ordered.projects);
  //db.get({ collection: "rooms", doc: roomId });
  const currentRoom = useSelector(
    ({ firestore: { data } }) => data.rooms[roomId]
  );
  const roomRef = db.collection("rooms").doc(roomId);
  const [room, setRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const VIEW_CREATE_A_PROJECT = "view create a project";
  const VIEW_ROOM = "view room";
  const VIEW_ADD_CONTRIBUTION_FORM = "view add contribution form";
  const VIEW_PROJECT_DETAILS = "view project details";
  const views = [VIEW_ROOM, VIEW_ADD_CONTRIBUTION_FORM, VIEW_PROJECT_DETAILS];
  const [currentView, setCurrentView] = useState(views[0]);
  const auth = firebase.auth();
  const currentUserId = firebase.auth().currentUser
    ? firebase.auth().currentUser.uid
    : "anonymous";
  const [key, setKey] = useState("home");

  const [showRoomOverview, setShowRoomOverview] = useState(true);
  console.log(roomId);

  function handleJoinClick() {
    alert("you joined the room!");
    setShowRoomOverview(false);
  }

  function RoomOverview() {
    if (showRoomOverview) {
      return (
        <>
          <Modal
            show={() => setShowRoomOverview(true)}
            onHide={() => setShowRoomOverview(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Welcome to the room!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Room #{roomId}</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleJoinClick}>
                Join
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    } else {
      return <></>;
    }
  }

  function CheckDocExistence() {
    roomRef
      .get()
      .then((docSnapshot) => {
        console.log(docSnapshot);
        if (docSnapshot.exists) {
          roomRef.onSnapshot((doc) => {
            setRoom(doc);
          });
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => <p>{error.message}</p>);
  }

  if (isLoaded(currentRoom)) {
    return <Room roomId={roomId} />;
  } else {
    return <p>Doc not found.</p>;
  }
}

RoomControl.propTypes = {
  roomId: PropTypes.string,
};

export default RoomControl;
