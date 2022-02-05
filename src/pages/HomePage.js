import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Paginate from "../components/Paginate";
import CorsoCarousel from "../components/CorsoCarousel";
import { listCorsi } from "../actions/corsoActions";

import Loader from "../components/Loader";
import Message from "../components/Message";
import Corso from "../components/Corso";

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const corsoList = useSelector((state) => state.corsoList);
  const { error, loading, corsi, page, pages } = corsoList;

  console.log(pages);

  let search_title = location.search;

  useEffect(() => {
    dispatch(listCorsi(search_title));
    // alert("This is a project for educational purposes only.");
  }, [dispatch, search_title]);

  return (
    <div>
      {!search_title && <CorsoCarousel />}

      <h1>Ultimi corsi</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {corsi
              .filter((item) => item.published && item.accepted)
              .map((corso) => (
                <Col key={corso.id} sm={12} md={6} lg={4} xl={3}>
                  <Corso corso={corso} />
                </Col>
              ))}
          </Row>
          <Paginate page={page} pages={pages} search_title={search_title} />
        </div>
      )}
    </div>
  );
}

export default HomePage;
