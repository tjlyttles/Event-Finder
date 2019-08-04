import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import EventContext from "../../context/event/eventContext";
import AuthContext from "../../context/auth/authContext";
import history from "../../utils/history";

const ViewEvent = () => {
  const eventContext = useContext(EventContext);
  const { clearCurrent, current } = eventContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  useEffect(() => {
    setEvent(current);
  }, [eventContext, current]);

  const [event, setEvent] = useState({
    name: "",
    location: "",
    category: "Movie",
    groupSize: "",
    description: "",
    attendingId: [],
    start: null,
    end: null
  });

  const {
    name,
    location,
    category,
    groupSize,
    description,
    start,
    end
  } = event;

  const handleJoin = (joinId) => {

  }

  const goBack = () => {
    clearCurrent();
    history.push("/user");
  };

  return (
    <div>
      <Card style={{ width: "25rem" }}>
        {" "}
        <Card.Body>
          <Card.Title>{name.toUpperCase()}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{category}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            Date: {start}
          </Card.Subtitle>
          <Card.Text>{description}</Card.Text>

          {/* <Button
            style={{ float: "right" }}
            className="btn-danger"
            size="sm"
            onClick={() => setShowAlert(true)}
          >
            Delete
          </Button> */}
          <Button
            type="submit"
            style={{ float: "right" }}
            className="btn-success"
            size="sm"
            onClick={() => handleJoin(user._id)}
          >
            + Join
          </Button>
          <Button size="sm" onClick={goBack}>
            Back To Profile
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ViewEvent;