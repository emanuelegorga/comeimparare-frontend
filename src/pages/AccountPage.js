import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";

import {
  getUtenteAccount,
  updateUtenteAccount,
} from "../actions/utenteActions";
import { listaOrdiniMiei } from "../actions/ordineActions";
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

  const listaMieiOrdini = useSelector((state) => state.listaMieiOrdini);
  const {
    loading: loadingOrders,
    error: errorOrders,
    ordini,
  } = listaMieiOrdini;

  useEffect(() => {
    if (!utenteInfo) {
      navigate("/login");
    } else {
      if (!utente || !utente.name || utenteInfo.id !== utente.id) {
        dispatch(getUtenteAccount(params.id));
        dispatch(listaOrdiniMiei());
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
            <Form.Label>Nome</Form.Label>
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
        <h2>I miei acquisti</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Data</th>
                <th>Totale</th>
                <th>Stato pagamento</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {ordini.map((ordine) => (
                <tr key={ordine.id}>
                  <td>{ordine.id}</td>
                  <td>{ordine.created_at.substring(0, 10)}</td>
                  <td>${ordine.total}</td>
                  <td>
                    {ordine.paid_at ? (
                      ordine.paid_at.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/ordini/${ordine.id}`}>
                      <Button className="btn-sm">Dettagli</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default AccountPage;
