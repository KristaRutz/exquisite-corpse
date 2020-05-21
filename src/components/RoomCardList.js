import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import Button from "react-bootstrap/Button";
function RoomCardList(props) {
  const { rooms } = props;

  function RoomCard(room) {
    return (
      <Card key={room.id} style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{room.roomName}</Card.Title>
          <Card.Text>{room.description}</Card.Text>
          <Button variant="primary" href={`/room/${room.id}`}>
            Visit
          </Button>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
          {/* Obviously this should be made responsive */}
        </Card.Footer>
      </Card>
    );
  }

  return <CardColumns>{rooms.map((room) => RoomCard(room))}</CardColumns>;
  // these columns just keep getting smaller, find a smoother way to render.
}

RoomCardList.propTypes = {
  rooms: PropTypes.array,
};

export default RoomCardList;
