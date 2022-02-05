import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { login } from "../actions/utenteActions";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const utenteLogin = useSelector((state) => state.utenteLogin);
  const { error, loading, utenteInfo } = utenteLogin;

  useEffect(() => {
    if (utenteInfo) {
      navigate(redirect);
    }
  }, [navigate, utenteInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Indirizzo Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Inserisci email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Inserisci password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Login
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Nuovo utente?{" "}
          <Link
            to={
              redirect
                ? `/registrazione?redirect=${redirect}`
                : "/registrazione"
            }
          >
            Registrati
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginPage;
