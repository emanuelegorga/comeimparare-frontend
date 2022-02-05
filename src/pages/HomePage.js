import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CorsoCarousel from "../components/CorsoCarousel";
import { listLatestCorsi } from "../actions/corsoActions";

import Loader from "../components/Loader";
import Message from "../components/Message";
import Corso from "../components/Corso";

function HomePage() {
  const dispatch = useDispatch();

  const corsoLatest = useSelector((state) => state.corsoLatest);
  const { error, loading, corsi } = corsoLatest;

  useEffect(() => {
    dispatch(listLatestCorsi());
    // alert("This is a project for educational purposes only.");
  }, [dispatch]);

  return (
    <div>
      <CorsoCarousel />

      <h1>Ultimi corsi</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {corsi
            .filter((item) => item.published && item.accepted)
            .map((corso) => (
              <Col key={corso.id} sm={12} md={6} lg={4} xl={3}>
                <Corso corso={corso} />
              </Col>
            ))}
        </Row>
      )}
    </div>
  );
}

export default HomePage;
