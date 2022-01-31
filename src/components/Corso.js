import React from "react";
import { Card } from "react-bootstrap";
import Valutazione from "./Valutazione";

function Corso({ corso }) {
  return (
    <Card className="my-3 p-3 rounded">
      <a href={`/corso/${corso.id}`}>
        <Card.Img src={corso.image} />
      </a>

      <Card.Body>
        <a href={`/corso/${corso.id}`}>
          <Card.Title as="div">
            <strong>{corso.title}</strong>
          </Card.Title>
        </a>

        <Valutazione
          value={corso.average_rating}
          text="Valutazione: "
          color={"#f8e825"}
        />

        <Card.Text as="div">
          <div className="my-3">Difficoltà: {corso.difficulty}</div>
        </Card.Text>
        <Card.Text as="div">
          <div className="my-3">Linguaggio: {corso.language}</div>
        </Card.Text>
        <Card.Text as="div">
          <div className="my-3">Descrizione: {corso.description}</div>
        </Card.Text>
        <Card.Text as="div">
          <div className="my-3">Descrizione breve: {corso.summary}</div>
        </Card.Text>

        <Card.Text as="h3">${corso.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Corso;
