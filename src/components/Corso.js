import React from "react";
import { Card } from "react-bootstrap";
import Valutazione from "./Valutazione";
import { Link } from "react-router-dom";

function Corso({ corso }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/corsi/${corso.id}`}>
        <Card.Img src={corso.logo_url} />
      </Link>

      <Card.Body>
        <Link to={`/corsi/${corso.id}`}>
          <Card.Title as="div">
            <strong>{corso.title}</strong>
          </Card.Title>
        </Link>

        <Valutazione value={corso.average_rating} text="" color={"#f8e825"} />

        <Card.Text as="div">
          <div className="my-3">
            <i className="fas fa-signal"></i> {corso.difficulty}
          </div>
        </Card.Text>
        <Card.Text as="div">
          <div className="my-3">
            <i className="fas fa-globe"></i> {corso.language}
          </div>
        </Card.Text>
        <Card.Text as="div">
          <div className="my-3">
            <i className="fas fa-book"></i> {corso.lectures.length} Lezione
          </div>
        </Card.Text>
        <Card.Text as="div">
          <div className="my-3">{corso.description}</div>
        </Card.Text>

        <Card.Text as="h3">€ {corso.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Corso;
