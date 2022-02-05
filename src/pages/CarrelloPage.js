import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";

import Message from "../components/Message";
import {
  aggiungiAlCarrello,
  rimuoviDaCarrello,
} from "../actions/carrelloActions";

function CarrelloPage() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const carrello = useSelector((state) => state.carrello);
  const { carrelloItems } = carrello;

  useEffect(() => {
    if (params.id) {
      dispatch(aggiungiAlCarrello(params.id));
    }
  }, [dispatch, params.id]);

  const rimuoviDaCarrelloHandler = (id) => {
    dispatch(rimuoviDaCarrello(id));
  };

  const checkoutHandler = () => {
    navigate("/metodopagamento");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Carrello</h1>
        {carrelloItems.length === 0 ? (
          <Message variant="info">
            Il tuo carrello è vuoto. <Link to="/">Torna Indietro</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {carrelloItems.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.logo} alt={item.title} fluid rounded />
                  </Col>

                  <Col md={3}>
                    <Link to={`/courses/${item.id}`}>{item.title}</Link>
                  </Col>

                  <Col md={2}>€{item.price}</Col>

                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => rimuoviDaCarrelloHandler(item.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Totale (
                {carrelloItems
                  .reduce((acc, item) => acc + item.price, 0)
                  .toFixed(2)}
                )
              </h2>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block w-100"
                disabled={false}
                onClick={checkoutHandler}
              >
                Procedi all'acquisto
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CarrelloPage;
