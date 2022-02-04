import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";

import { getUtenteAccount, updateUtenteAccount } from "../actions/utenteAction";
import { UTENTE_UPDATE_ACCOUNT_RESET } from "../constants/utenteConstants";

function AccountPage() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");

  const utenteAccount = useSelector((state) => state.utenteAccount);
  const { error, loading, utente } = utenteAccount;

  const utenteLogin = useSelector((state) => state.utenteLogin);
  const { utenteInfo } = utenteLogin;

  const utenteUpdateAccount = useSelector((state) => state.utenteUpdateAccount);
  const { success } = utenteUpdateAccount;

  useEffect(() => {
    if (!utenteInfo) {
      navigate("/login");
    } else {
      if (!utente || !utente.name) {
        dispatch(getUtenteAccount(params.id));
      } else {
        setName(utente.name);
        setEmail(utente.email);
      }
    }
  }, [dispatch, navigate, utenteInfo, utente, params.id]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setMessage("La password non corrisponde.");
    } else {
      dispatch(
        updateUtenteAccount(
          {
            user: {
              name: name,
              email: email,
              password: password,
            },
          },
          utente.id
        )
      );
      setMessage("");
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>Account utente</h2>

        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder="Inserisci Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
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
                type="password"
                placeholder="Inserisci Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="passwordConfirm">
              <Form.Label>Conferma Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Conferma Password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form.Group>

          <Button type="submit" variant="primary">
            Aggiorna
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>I miei corsi</h2>
      </Col>
    </Row>
  );
}

export default AccountPage;
