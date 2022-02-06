import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { creaLezione } from "../actions/lezioneActions";

import { LEZIONE_CREA_RESET } from "../constants/lezioneConstants";

function CreaLezionePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();

  const corsoId = params.id;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const utenteLogin = useSelector((state) => state.utenteLogin);
  const { utenteInfo } = utenteLogin;

  const lezioneCrea = useSelector((state) => state.lezioneCrea);
  const { error, loading, success } = lezioneCrea;

  useEffect(() => {
    if (success) {
      dispatch({ type: LEZIONE_CREA_RESET });
      navigate(`/corsi/${corsoId}`);
    } else {
      setTitle(title);
      setContent(content);
    }
  }, [dispatch, corsoId, navigate, success, content, title]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      creaLezione({
        corsoId,
        title,
        content,
      })
    );
  };

  return (
    <div>
      <Button className="btn btn-light my-3" onClick={() => navigate(-1)}>
        Indietro
      </Button>

      <FormContainer>
        <h1>Crea Lezione</h1>

        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Titolo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci titolo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Contenuto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci Contenuto"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Crea Lezione
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default CreaLezionePage;
