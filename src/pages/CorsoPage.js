import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";

import Valutazione from "../components/Valutazione";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { listCorsoProperties } from "../actions/corsoActions";

function CorsoPage() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const corsoProperties = useSelector((state) => state.corsoProperties);
  const { error, loading, corso, studenti, lezioni } = corsoProperties;

  useEffect(() => {
    dispatch(listCorsoProperties(params.id));
  }, [dispatch, params.id]);

  const aggiungiAlCarrello = () => {
    navigate(`/carrello/${params.id}`);
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Indietro
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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

              <ListGroup.Item>Prezzo: {corso.price}€</ListGroup.Item>
              <ListGroup.Item>Descrizione: {corso.description}</ListGroup.Item>
              <ListGroup.Item>Introduzione: {corso.summary}</ListGroup.Item>
            </ListGroup>
          </Col>

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
                      <strong>{corso.difficulty}</strong>
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
        </Row>
      )}
    </div>
  );
}

export default CorsoPage;
