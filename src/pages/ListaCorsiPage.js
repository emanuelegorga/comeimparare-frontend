import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { listCorsi, eliminaCorso, creaCorso } from "../actions/corsoActions";
import { CREA_CORSO_RESET } from "../constants/corsoConstants";

function ListaCorsiPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  let search_title = location.search;

  const corsoList = useSelector((state) => state.corsoList);
  const { error, loading, corsi } = corsoList;

  const utenteLogin = useSelector((state) => state.utenteLogin);
  const { utenteInfo } = utenteLogin;

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

    if (!utenteInfo.is_admin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/corsi/${createdCorso.id}/modifica`);
    } else {
      dispatch(listCorsi(search_title));
    }
  }, [
    dispatch,
    navigate,
    utenteInfo,
    successDelete,
    successCreate,
    createdCorso,
    search_title,
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
      <Row className="align-items-center">
        <Col>
          <h1>Lista Corsi</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createCorsoHandler}>
            <i className="fas fa-plus"></i> Crea corso
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-check" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {corso.published ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-check" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>{corso.average_rating}</td>

                <td>
                  <LinkContainer to={`/admin/corsi/${corso.id}/modifica`}>
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
      )}
    </div>
  );
}

export default ListaCorsiPage;
