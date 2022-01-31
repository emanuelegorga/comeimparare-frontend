import React from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import Valutazione from "../components/Valutazione";
import corsi from "../corsi";

function CorsoPage() {
  const params = useParams();
  const corso = corsi.find((corso) => corso.id === params.id);

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Indietro
      </Link>
      <Row>
        <Col md={6}>
          <Image src={corso.image} alt={corso.title} fluid />
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
                    <strong>{corso.joins.length}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Numero lezioni:</Col>
                  <Col>
                    <strong>{corso.lectures.length}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
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
    </div>
  );
}

export default CorsoPage;
