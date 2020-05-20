import React from "react";
import PropTypes from "prop-types";
import {
  isLoaded,
  useFirestoreConnect,
  useFirestore,
} from "react-redux-firebase";
import { useSelector } from "react-redux";

function UserRooms(props) {
  const { userId } = props;
  useFirestoreConnect({ collection: rooms });
  //const userRooms = useSelector(({ firestore: { data } }) => data.rooms && data.r[todoId])}
  const db = useFirestore();
  // const rooms = useSelector((state) => state.firestore.ordered.rooms);
  let userRooms = db
    .collection("rooms")
    .where("ownerId", "==", userId)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
      });
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });

  if (isLoaded(rooms)) return <></>;
}
UserRooms.propTypes = {
  userId: PropTypes.string,
};
export default UserRooms;
