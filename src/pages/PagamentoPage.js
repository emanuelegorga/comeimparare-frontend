import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../components/FormContainer";
import ConfermaCheckout from "../components/ConfermaCheckout";

import { metodoPagamento } from "../actions/carrelloActions";

function PagamentoPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [metodo, setMetodo] = useState("Stripe");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(metodoPagamento(metodo));
    navigate("/confermaordine");
  };

  return (
    <FormContainer>
      <ConfermaCheckout conferma1 conferma2 conferma3 />
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Seleziona metodo</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Stripe"
              id="stripe"
              name="metodoPagamento"
              checked
              onChange={(e) => setMetodo(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continua
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PagamentoPage;
