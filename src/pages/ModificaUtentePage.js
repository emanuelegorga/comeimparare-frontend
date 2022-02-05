import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { getUtenteAccount, updateUtente } from "../actions/utenteActions";
import { UTENTE_UPDATE_RESET } from "../constants/utenteConstants";

function ModificaUtentePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();

  const utenteId = params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const utenteAccount = useSelector((state) => state.utenteAccount);
  const { error, loading, utente } = utenteAccount;

  const utenteUpdate = useSelector((state) => state.utenteUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = utenteUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: UTENTE_UPDATE_RESET });
      navigate("/admin/listautenti");
    } else {
      if (!utente.name || utente.id !== utenteId) {
        dispatch(getUtenteAccount(utenteId));
      } else {
        setName(utente.name);
        setEmail(utente.email);
        setIsAdmin(utente.is_admin);
      }
    }
  }, [utente, utenteId, dispatch, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUtente({ id: utente.id, name, email, isAdmin }));
  };

  return (
    <div>
      <Link to="/admin/listautenti">Indietro</Link>

      <FormContainer>
        <h1>Modifica utente</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
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

              <Form.Group controlId="isadmin">
                <Form.Check
                  type="checkbox"
                  label="Is Admin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></Form.Check>
              </Form.Group>
            </Form.Group>

            <Button type="submit" variant="primary">
              Aggiorna utente
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ModificaUtentePage;
