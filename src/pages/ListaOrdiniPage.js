import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";

import { getListaOrdini } from "../actions/ordineActions";

function ListaOrdiniPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const listaOrdini = useSelector((state) => state.listaOrdini);
  const { loading, error, ordini } = listaOrdini;

  const utenteLogin = useSelector((state) => state.utenteLogin);
  const { utenteInfo } = utenteLogin;

  useEffect(() => {
    if (utenteInfo && utenteInfo.is_admin) {
      dispatch(getListaOrdini());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, utenteInfo]);

  return (
    <div>
      <h1>Tutti gli ordini</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped responsive bordered hover className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Data</th>
              <th>Totale</th>
              <th>Stato pagamento</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {ordini.map((ordine) => (
              <tr key={ordine.id}>
                <td>{ordine.id}</td>
                <td>{ordine.created_at.substring(0, 10)}</td>
                <td>${ordine.total}</td>
                <td>
                  {ordine.paid_at ? (
                    ordine.paid_at.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/ordini/${ordine.id}`}>
                    <Button className="btn-sm">Dettagli</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default ListaOrdiniPage;
