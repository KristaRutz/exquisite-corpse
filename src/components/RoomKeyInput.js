import React, { useState } from "react";
import { Form, FormControl, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import { MdVpnKey } from "react-icons/md";
import { Redirect } from "react-router-dom";

function RoomKeyInput() {
  const [redirect, setRedirect] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(null);

  function RoomKeyEntered(event) {
    event.preventDefault();
    setCurrentRoomId(event.target.roomId.value);
    event.target.roomId.value = "";
    console.log(currentRoomId);
    setRedirect(true);
  }
  function RenderRedirect() {
    if (redirect) {
      setRedirect(false);
      return <Redirect to={`/room/${currentRoomId}`} />;
    } else return <></>;
  }
  return (
    <>
      <RenderRedirect />
      <Form onSubmit={RoomKeyEntered} inline>
        <InputGroup>
          <FormControl type="text" placeholder="enter room key" name="roomId" />
          <InputGroup.Append>
            <Button variant="primary" type="submit">
              <MdVpnKey />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </>
  );
}

export default RoomKeyInput;
