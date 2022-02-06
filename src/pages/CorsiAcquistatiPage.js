import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Paginate from "../components/Paginate";
import { listCorsiAcquistati } from "../actions/corsoActions";

import Loader from "../components/Loader";
import Message from "../components/Message";
import Corso from "../components/Corso";

function CorsiAcquistatiPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const utenteLogin = useSelector((state) => state.utenteLogin);
  const { utenteInfo } = utenteLogin;

  const corsiAcquistati = useSelector((state) => state.corsiAcquistati);
  const { error, loading, corsi } = corsiAcquistati;

  useEffect(() => {
    dispatch(listCorsiAcquistati());
  }, [dispatch]);

  return (
    <div>
      <h1>Corsi acquistati</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {corsi.length > 0 ? (
              corsi
                .filter((item) => item.published && item.accepted)
                .map((corso) => (
                  <Col key={corso.id} sm={12} md={6} lg={4} xl={3}>
                    <Corso corso={corso} />
                  </Col>
                ))
            ) : (
              <Message variant="info">
                Non hai ancora acquistato un corso
              </Message>
            )}
          </Row>
        </div>
      )}
    </div>
  );
}

export default CorsiAcquistatiPage;
