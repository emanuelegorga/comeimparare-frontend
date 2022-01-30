import React from "react";
import { Row, Col } from "react-bootstrap";

import Corso from "../components/Corso";
import corsi from "../corsi";

function HomePage() {
  return (
    <div>
      <h1>Ultimi corsi</h1>
      <Row>
        {corsi.map((corso) => (
          <Col key={corso.id} sm={12} md={6} lg={4} xl={3}>
            <Corso corso={corso} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomePage;
