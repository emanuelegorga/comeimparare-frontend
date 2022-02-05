import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function ConfermaCheckout({ conferma1, conferma2, conferma3 }) {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {conferma1 ? (
          <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Login</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {conferma2 ? (
          <LinkContainer to="/metodopagamento">
            <Nav.Link>Pagamento</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Pagamento</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {conferma3 ? (
          <LinkContainer to="/confermaordine">
            <Nav.Link>Conferma Ordine</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Conferma Ordine</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
}

export default ConfermaCheckout;
