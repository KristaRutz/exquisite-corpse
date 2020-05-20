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
import { Redirect } from "react-router-dom";

function RoomControl(props) {
  const { roomId, onSelectRoomClick } = props;
  useFirestoreConnect([
    { collection: "projects" },
    { collection: "rooms", doc: roomId },
  ]);
  const db = useFirestore();
  const projects = useSelector((state) => state.firestore.ordered.projects);
  //db.get({ collection: "rooms", doc: roomId });
  //const currentRoom = useSelector(({ firestore: { data } }) => data.rooms[roomId]);
  const roomRef = db.collection("rooms").doc(roomId);
  const [room, setRoom] = useState(null);

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
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
          return <p>Doc not found.</p>;
        } else {
          console.log("Document data:", doc.data());
          return <Room roomId={roomId} />;
        }
      })
      .catch((err) => {
        console.log("Error getting document", err);
        return <Redirect to={`/room`} />;
      });
    return null;
  }

  function checkDocExistence() {
    roomRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
          return false;
        } else {
          setRoom(doc.data);
          console.log("Document data:", doc.data());
          return true;
        }
      })
      .catch((err) => {
        console.log("Error getting document", err);
        return false;
      });
    return false;
  }

  if (checkDocExistence() && room != null) {
    return <CheckDocExistence />;
  } else {
    return <LoadingScreen />;
  }
}

RoomControl.propTypes = {
  roomId: PropTypes.string,
};

export default RoomControl;
