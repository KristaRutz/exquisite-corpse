import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  isLoaded,
  useFirestoreConnect,
  useFirestore,
  isEmpty,
} from "react-redux-firebase";
import { useSelector } from "react-redux";
import LoadingScreen from "./LoadingScreen";
import RoomCardList from "./RoomCardList";

function UserRooms(props) {
  const { userId } = props;
  useFirestoreConnect({ collection: "rooms" });
  const rooms = useSelector((state) => state.firestore.ordered.rooms);

  if (!isLoaded(rooms)) {
    return <LoadingScreen />;
  } else if (rooms === null) {
    return <p>No rooms yet.</p>;
  } else {
    console.log(rooms);
    const userOwnedRooms = rooms.filter((room) => room.ownerId === userId);
    const roomMemberships = rooms.filter((room) =>
      room.members.includes(userId)
    );
    return (
      <>
        <RoomCardList rooms={userOwnedRooms} />
      </>
    );
  }
}
UserRooms.propTypes = {
  userId: PropTypes.string,
};
export default UserRooms;
