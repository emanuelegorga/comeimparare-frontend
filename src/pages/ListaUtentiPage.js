import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";

import { getListaUtenti, eliminaUtente } from "../actions/utenteActions";

function ListaUtentiPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const listaUtenti = useSelector((state) => state.listaUtenti);
  const { loading, error, utenti } = listaUtenti;

  const utenteLogin = useSelector((state) => state.utenteLogin);
  const { utenteInfo } = utenteLogin;

  const utenteElimina = useSelector((state) => state.utenteElimina);
  const { success: successElimina } = utenteElimina;

  useEffect(() => {
    if (utenteInfo && utenteInfo.is_admin) {
      dispatch(getListaUtenti());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, utenteInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Sei sicuro di voler proseguire?")) {
      dispatch(eliminaUtente(id));
      window.location.reload();
    }
  };

  return (
    <div>
      <h1>Account registrati</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped responsive bordered hover className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {utenti.map((utente) => (
              <tr key={utente.id}>
                <td>{utente.id}</td>
                <td>{utente.name}</td>
                <td>{utente.email}</td>
                <td>
                  {utente.is_admin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-check" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/accounts/${utente.id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(utente.id)}
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

export default ListaUtentiPage;
