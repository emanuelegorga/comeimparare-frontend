import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";

import Message from "../components/Message";
import ConfermaCheckout from "../components/ConfermaCheckout";
import CheckoutForm from "../components/CheckoutForm";
import { creaOrdine } from "../actions/ordineActions";
import { CREA_ORDINE_RESET } from "../constants/ordineConstants";

const stripePromise = loadStripe(
  "pk_test_51KPhagD4017DXUNmjQJ7INsOtvZAJtmiGmSu6IvYU67wB5GMfgKRCciefLuQTrhzTdU8amh7eDPcW1Uj09dWETEf00JcHRrF6Z"
);

function ConfermaOrdinePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const carrello = useSelector((state) => state.carrello);

  const ordineCrea = useSelector((state) => state.ordineCrea);
  const { ordine, error, success, loading } = ordineCrea;

  const utenteLogin = useSelector((state) => state.utenteLogin);
  const { utenteInfo } = utenteLogin;

  const [clientSecret, setClientSecret] = useState("");
  const [ordineId, setOrdineId] = useState("");
  const [dispatched, setDispatched] = useState(false);

  carrello.prezzoTotale = carrello.carrelloItems
    .reduce((acc, corso) => acc + corso.price, 0)
    .toFixed(2);

  carrello.corsiIds = carrello.carrelloItems.map((corsoItem) => corsoItem.id);

  if (!carrello.metodoPagamento) {
    navigate("/metodopagamento");
  }

  useEffect(() => {
    if (
      utenteInfo &&
      !ordine &&
      !error &&
      carrello.carrelloItems.length > 0 &&
      !dispatched
    ) {
      dispatch(
        creaOrdine({
          ordine_items: carrello.carrelloItems,
          metodo_pagamento: carrello.metodoPagamento,
          prezzo_totale: carrello.prezzoTotale,
          corsi: carrello.corsiIds,
        })
      );
      setDispatched(true);
    }

    if (success && ordine && !loading) {
      dispatch({ type: CREA_ORDINE_RESET });
      setClientSecret(ordine.metadata["client_secret"]);
      setOrdineId(ordine.id);
    }
  }, [
    dispatch,
    ordine,
    carrello,
    loading,
    success,
    utenteInfo,
    error,
    dispatched,
  ]);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      <ConfermaCheckout conferma1 conferma2 conferma3 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Metodo di pagamento</h2>

              <p>
                <strong>Metodo: </strong>
                {carrello.metodoPagamento}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>I tuoi corsi</h2>
              {carrello.carrelloItems.length === 0 ? (
                <Message variant="info">Il tuo carrello è vuoto</Message>
              ) : (
                <ListGroup variant="flush">
                  {carrello.carrelloItems.map((corso, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={corso.logo}
                            alt={corso.title}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col md={8}>
                          <Link to={`corsi/${corso.id}`}>{corso.title}</Link>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Riepilogo ordine</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Totale:</Col>
                  <Col>€ {carrello.prezzoTotale}</Col>
                </Row>
              </ListGroup.Item>

              {clientSecret && (
                <ListGroup.Item>
                  <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm ordineId={ordineId} />
                  </Elements>
                </ListGroup.Item>
              )}

              {error && (
                <ListGroup.Item>
                  <Message variant="danger">{error}</Message>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ConfermaOrdinePage;
