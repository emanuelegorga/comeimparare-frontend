import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import axios from "axios";

import Corso from "../components/Corso";

function HomePage() {
  const [corsi, setCorsi] = useState([]);

  useEffect(() => {
    async function fetchCorsi() {
      const { data } = await axios.get("/courses");
      setCorsi(data);
    }

    fetchCorsi();
  }, []);

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
