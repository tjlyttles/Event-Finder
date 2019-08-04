
import React, { useState, useEffect, useContext } from "react";
import history from "../utils/history";
import AuthContext from "../context/auth/authContext";
import { Container, Row, Col, Jumbotron, Modal, Button } from "react-bootstrap";
import Register from "./Register"
import SignIn from "./SignIn"

const About = props => {
  const [showRegister, setShowRegister] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      // redirect to userpage
      history.push("/user");
    }

    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <Container>
      <Jumbotron fluid>
        <h1 className="text-center"> Friend Finder</h1>
      </Jumbotron>
      <Row className="d-flex justify-content-center">
        <Col md="3" className="d-flex justify-content-between">
          <Button variant="primary" onClick={() => setShowRegister(true)}>
            Register
          </Button>
          <Button variant="primary" onClick={() => setShowSignIn(true)}>
            Sign In
          </Button>
        </Col>
      </Row>
      <Modal
        size="lg"
        show={showRegister}
        onHide={() => setShowRegister(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Register onHide={() => setShowRegister(false)} />
        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        show={showSignIn}
        onHide={() => setShowSignIn(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignIn onHide={() => setShowSignIn(false)} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default About;