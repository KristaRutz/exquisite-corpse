import React from "react";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

function RoomMemberList(props) {
  const { memberList } = props;

  return (
    <ListGroup>
      {memberList.map((member) => {
        return <ListGroupItem>{member.displayName}</ListGroupItem>;
      })}
    </ListGroup>
  );
}

RoomMemberList.propTypes = {
  memberList: PropTypes.array,
};

export default RoomMemberList;
