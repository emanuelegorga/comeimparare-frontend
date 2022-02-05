import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { listCorsoProperties, updateCorso } from "../actions/corsoActions";

import { CORSO_UPDATE_RESET } from "../constants/corsoConstants";

function ModificaCorsoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();

  const corsoId = params.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [language, setLanguage] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [accepted, setAccepted] = useState("");
  const [published, setPublished] = useState("");
  const [price, setPrice] = useState(0);
  const [logo, setLogo] = useState("");

  const difficulties = ["easy", "medium", "hard"];
  const languages = ["italian", "english", "spanish", "french"];

  const corsoProperties = useSelector((state) => state.corsoProperties);
  const { error, loading, corso } = corsoProperties;

  const corsoUpdate = useSelector((state) => state.corsoUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = corsoUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CORSO_UPDATE_RESET });
      navigate("/admin/listacorsi");
    } else {
      if (!corso.title || corso.id !== corsoId) {
        dispatch(listCorsoProperties(corsoId));
      } else {
        setTitle(corso.title);
        setDescription(corso.description);
        setSummary(corso.summary);
        setLanguage(corso.language);
        setDifficulty(corso.difficulty);
        setAccepted(corso.accepted);
        setPublished(corso.published);
        setPrice(corso.price);
        setLogo(corso.logo);
      }
    }
  }, [dispatch, corso, corsoId, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCorso({
        id: corsoId,
        title,
        description,
        summary,
        language,
        difficulty,
        accepted,
        published,
        price,
      })
    );
  };

  return (
    <div>
      <Link to="/admin/listacorsi">Indietro</Link>

      <FormContainer>
        <h1>Modifica corso</h1>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

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

            <Form.Group controlId="description">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci Descrizione"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Breve descrizione</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci una descrizione breve"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="language">
              <Form.Label>Lingua</Form.Label>
              <Form.Control
                as="select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {languages.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="difficulty">
              <Form.Label>Difficoltà</Form.Label>
              <Form.Control
                as="select"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                {difficulties.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Prezzo</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci prezzo"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Logo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci logo"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="accepted">
              <Form.Label>Accetta corso</Form.Label>
              <Form.Check
                type="checkbox"
                placeholder="Accetta corso"
                value={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId="published">
              <Form.Label>Pubblica corso</Form.Label>
              <Form.Check
                type="checkbox"
                placeholder="Pubblica corso"
                value={published}
                onChange={(e) => setPublished(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Aggiorna corso
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ModificaCorsoPage;
