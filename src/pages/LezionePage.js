import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Button } from "react-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";

import { listLezioneProperties } from "../actions/lezioneActions";

function LezionePage() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const lezioneId = params.id;
  const corsoId = params.corso_id;

  const lezioneProperties = useSelector((state) => state.lezioneProperties);
  const { error, loading, lezione } = lezioneProperties;

  const utenteLogin = useSelector((state) => state.utenteLogin);
  const { utenteInfo } = utenteLogin;

  useEffect(() => {
    dispatch(listLezioneProperties(lezioneId, corsoId));
  }, [dispatch, lezioneId, corsoId]);

  return (
    <div>
      <Button className="btn btn-light my-3" onClick={() => navigate(-1)}>
        Indietro
      </Button>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{lezione.title}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <p>{lezione.content}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default LezionePage;
