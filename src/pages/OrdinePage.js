import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";

import { getDettagliOrdine } from "../actions/ordineActions";

function OrdinePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const ordineId = params.id;
  const ordineDettagli = useSelector((state) => state.ordineDettagli);
  const { ordine, error, loading } = ordineDettagli;

  useEffect(() => {
    if (!ordine || ordine.id !== ordineId) {
      dispatch(getDettagliOrdine(ordineId));
    }
  }, [ordine, dispatch, ordineId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Numero identificativo ordine: {ordine.id.substring(0, 5)}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <p>
                <strong>Metodo di pagamento: </strong>
                {ordine.payment_method}
              </p>
              {ordine.paid_at ? (
                <Message variant="success">
                  Pagato il {ordine.paid_at.substring(0, 10)}
                </Message>
              ) : (
                <Message variant="warning">Non pagato</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Corsi presenti nell'ordine</h2>
              {ordine.purchased.length === 0 ? (
                <Message variant="info">Ordine vuoto</Message>
              ) : (
                <ListGroup variant="flush">
                  {ordine.purchased.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={`${process.env.REACT_APP_API_URL}/item.logo_url}`}
                            alt={item.course.title}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col md={4}>
                          <Link to={`/corsi/${item.course.id}`}>
                            {item.course.title}
                          </Link>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Riassunto ordine</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Totale:</Col>
                  <Col>€ {ordine.total}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrdinePage;
