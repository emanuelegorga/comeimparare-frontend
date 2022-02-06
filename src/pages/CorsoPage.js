import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";

import Valutazione from "../components/Valutazione";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { listCorsoProperties, updateCorsoRate } from "../actions/corsoActions";

import { CORSO_UPDATE_RATE_RESET } from "../constants/corsoConstants";

function CorsoPage() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const corsoProperties = useSelector((state) => state.corsoProperties);
  const { error, loading, corso, studenti, lezioni } = corsoProperties;

  const utenteLogin = useSelector((state) => state.utenteLogin);
  const { utenteInfo } = utenteLogin;

  const corsoUpdateRate = useSelector((state) => state.corsoUpdateRate);
  const {
    loading: loadingCorsoRate,
    error: errorCorsoRate,
    success: successCorsoRate,
  } = corsoUpdateRate;

  useEffect(() => {
    if (successCorsoRate) {
      setRating(0);
      setReview("");
      dispatch({ type: CORSO_UPDATE_RATE_RESET });
    }

    dispatch(listCorsoProperties(params.id));
  }, [dispatch, params.id, successCorsoRate]);

  const aggiungiAlCarrello = () => {
    navigate(`/carrello/${params.id}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCorsoRate(params.id, {
        rating,
        review,
      })
    );
  };

  const aggiungiLezione = (e) => {
    e.preventDefault();
    navigate(`/corsi/${corso.id}/crealezione`);
  };

  return (
    <div>
      <Button className="btn btn-light my-3" onClick={() => navigate(-1)}>
        Indietro
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <Image src={corso.logo_url} alt={corso.title} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{corso.title}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Valutazione
                    value={corso.average_rating}
                    text="Valutazione: "
                    color="#f8e825"
                  />
                </ListGroup.Item>

                {undefined !== corso.user &&
                  utenteInfo &&
                  corso.user.id !== utenteInfo.id && (
                    <ListGroup.Item>Prezzo: {corso.price}€</ListGroup.Item>
                  )}
                <ListGroup.Item>{corso.description}</ListGroup.Item>
                <ListGroup.Item>{corso.summary}</ListGroup.Item>
                {undefined !== corso.user &&
                  utenteInfo &&
                  corso.user.id === utenteInfo.id && (
                    <ListGroup.Item>
                      <Button onClick={aggiungiLezione} className="btn my-3">
                        Aggiungi nuova lezione
                      </Button>
                    </ListGroup.Item>
                  )}
              </ListGroup>
            </Col>

            {undefined !== corso.user &&
              utenteInfo &&
              corso.user.id !== utenteInfo.id && (
                <Col md={3}>
                  <Card>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Prezzo:</Col>
                          <Col>
                            <strong>{corso.price}€</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Lingua:</Col>
                          <Col>
                            <strong>{corso.language}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Difficoltà:</Col>
                          <Col>
                            <strong>{corso.difficulty}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Creato il:</Col>
                          <Col>
                            <strong>
                              {undefined !== corso.created_at &&
                                corso.created_at.substring(0, 10)}
                            </strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Studenti iscritti:</Col>
                          <Col>
                            <strong>{studenti.length}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Numero lezioni:</Col>
                          <Col>
                            <strong>{lezioni.length}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Button
                          onClick={aggiungiAlCarrello}
                          disabled={false} // check if User has appropriate role to buy
                          className="btn-block w-100"
                          type="button"
                        >
                          Aggiungi al carrello
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              )}
          </Row>

          <Row>
            <Col md={6}>
              <h4>Lezioni</h4>
              <ListGroup variant="flush">
                {undefined !== corso.lectures &&
                  corso.lectures.map((lecture) => (
                    <ListGroup.Item key={lecture.id}>
                      <strong>{lecture.title}</strong>
                      <p>{lecture.created_at.substring(0, 10)}</p>
                      {utenteInfo ? (
                        <Link to={`/corsi/${corso.id}/lezioni/${lecture.id}`}>
                          <i className="fas fa-arrow-right"></i> Guarda la
                          lezione
                        </Link>
                      ) : (
                        <Message variant="info">
                          Effettua il <Link to="/login">login</Link> guardare la
                          lezione
                        </Message>
                      )}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h4>Recensioni</h4>
              {undefined !== corso.joins && corso.joins.length === 0 && (
                <Message variant="info">Non sono presenti recensioni</Message>
              )}

              <ListGroup variant="flush">
                {undefined !== corso.joins &&
                  corso.joins.map((join) => (
                    <ListGroup.Item key={join.id}>
                      <strong>{join.username}</strong>
                      <Valutazione value={join.rating} color="#f8e825" />
                      <p>{join.created_at.substring(0, 10)}</p>
                      <p>{join.review}</p>
                    </ListGroup.Item>
                  ))}

                <ListGroup.Item>
                  <h4>Scrivi una recensione</h4>

                  {loadingCorsoRate && <Loader />}
                  {successCorsoRate && (
                    <Message variant="success">
                      Recensione aggiunta con successo
                    </Message>
                  )}
                  {errorCorsoRate && (
                    <Message variant="danger">{errorCorsoRate}</Message>
                  )}

                  {utenteInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rate">
                        <Form.Label>Valutazione</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Seleziona un voto...</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="review">
                        <Form.Label>Recensione</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="5"
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button
                        disabled={loadingCorsoRate}
                        type="submit"
                        variant="primary"
                      >
                        Invia
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="info">
                      Effettua il <Link to="/login">login</Link> per scrivere
                      una recensione
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default CorsoPage;
