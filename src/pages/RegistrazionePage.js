import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { registrazione } from "../actions/utenteAction";

function RegistrazionePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const utenteRegistrazione = useSelector((state) => state.utenteRegistrazione);
  const { error, loading, utenteInfo } = utenteRegistrazione;

  useEffect(() => {
    if (utenteInfo) {
      navigate(redirect);
    }
  }, [navigate, utenteInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setMessage("La password non corrisponde.");
    } else {
      dispatch(registrazione(name, email, password, passwordConfirmation));
    }
  };

  return (
    <FormContainer>
      <h1>Registrazione</h1>

      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Inserisci nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Indirizzo email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Inserisci Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Inserisci Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="passwordConfirm">
            <Form.Label>Conferma password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Conferma Password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form.Group>

        <Button type="submit" variant="primary">
          Registrati
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Sei già registrato?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegistrazionePage;
