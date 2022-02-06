import React, { useEffect } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  eliminaCorso,
  creaCorso,
  listCorsiCreati,
} from "../actions/corsoActions";

import { CREA_CORSO_RESET } from "../constants/corsoConstants";

import Loader from "../components/Loader";
import Message from "../components/Message";
import Corso from "../components/Corso";

function CorsiCreatiPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const utenteLogin = useSelector((state) => state.utenteLogin);
  const { utenteInfo } = utenteLogin;

  const corsiCreati = useSelector((state) => state.corsiCreati);
  const { error, loading, corsi } = corsiCreati;

  const corsoElimina = useSelector((state) => state.corsoElimina);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = corsoElimina;

  const corsoCrea = useSelector((state) => state.corsoCrea);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    corso: createdCorso,
  } = corsoCrea;

  useEffect(() => {
    dispatch({ type: CREA_CORSO_RESET });

    if (successCreate) {
      navigate(`/corsi/${createdCorso.id}/modifica`);
    }

    dispatch(listCorsiCreati());
  }, [
    dispatch,
    createdCorso,
    navigate,
    successCreate,
    successDelete,
    utenteInfo,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Sei sicuro?")) {
      dispatch(eliminaCorso(id));
    }
  };

  const createCorsoHandler = (corso) => {
    dispatch(creaCorso());
  };

  return (
    <div>
      <h1>Corsi creati</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : location.pathname === "/corsicreati" ? (
        <div>
          <Row>
            {corsi.length > 0 ? (
              corsi.map((corso) => (
                <Col key={corso.id} sm={12} md={6} lg={4} xl={3}>
                  <Corso corso={corso} />
                </Col>
              ))
            ) : (
              <Message variant="info">Non hai ancora creato un corso</Message>
            )}
          </Row>
        </div>
      ) : (
        <div>
          <Row>
            <Col className="text-right">
              <Button className="my-3" onClick={createCorsoHandler}>
                <i className="fas fa-plus"></i> Crea corso
              </Button>
            </Col>
          </Row>
          <Row>
            <Table striped responsive bordered hover className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Titolo</th>
                  <th>Prezzo</th>
                  <th>Lingua</th>
                  <th>Difficoltà</th>
                  <th>Accettato</th>
                  <th>Pubblicato</th>
                  <th>Valutazione</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {corsi.map((corso) => (
                  <tr key={corso.id}>
                    <td>{corso.id}</td>
                    <td>{corso.title}</td>
                    <td>${corso.price}</td>
                    <td>{corso.language}</td>
                    <td>{corso.difficulty}</td>
                    <td>
                      {corso.accepted ? (
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-check"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {corso.published ? (
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-check"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>{corso.average_rating}</td>

                    <td>
                      <LinkContainer to={`/corsi/${corso.id}/modifica`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>

                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(corso.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </div>
      )}
    </div>
  );
}

export default CorsiCreatiPage;
