import React from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

function RoomMemberList(props) {
  const { memberList } = props;
  if (memberList.length < 1) {
    return <Alert variant="primary">No members right now.</Alert>;
  } else {
    return (
      <ListGroup>
        {memberList.map((member) => {
          return <ListGroupItem>{member.displayName}</ListGroupItem>;
        })}
      </ListGroup>
    );
  }
}

RoomMemberList.propTypes = {
  memberList: PropTypes.array,
};

export default RoomMemberList;
