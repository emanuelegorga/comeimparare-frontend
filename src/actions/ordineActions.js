import axios from "axios";

import {
  CREA_ORDINE_REQUEST,
  CREA_ORDINE_SUCCESS,
  CREA_ORDINE_FAIL,
  DETTAGLI_ORDINE_REQUEST,
  DETTAGLI_ORDINE_SUCCESS,
  DETTAGLI_ORDINE_FAIL,
  LISTA_MIEI_ORDINI_REQUEST,
  LISTA_MIEI_ORDINI_SUCCESS,
  LISTA_MIEI_ORDINI_FAIL,
  LISTA_ORDINI_REQUEST,
  LISTA_ORDINI_SUCCESS,
  LISTA_ORDINI_FAIL,
} from "../constants/ordineConstants";
import { PULISCI_CARRELLO } from "../constants/carrelloConstants";

export const creaOrdine = (ordine) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREA_ORDINE_REQUEST,
    });

    const {
      utenteLogin: { utenteInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${utenteInfo.auth_token}`,
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/orders`,
      ordine,
      config
    );

    dispatch({
      type: CREA_ORDINE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREA_ORDINE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDettagliOrdine = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DETTAGLI_ORDINE_REQUEST,
    });

    const {
      utenteLogin: { utenteInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${utenteInfo.auth_token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/orders/${id}`,
      config
    );

    dispatch({
      type: DETTAGLI_ORDINE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: PULISCI_CARRELLO,
    });
    localStorage.removeItem("carrelloItems");
  } catch (error) {
    dispatch({
      type: DETTAGLI_ORDINE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listaOrdiniMiei = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LISTA_MIEI_ORDINI_REQUEST,
    });

    const {
      utenteLogin: { utenteInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${utenteInfo.auth_token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/orders`,
      config
    );

    dispatch({
      type: LISTA_MIEI_ORDINI_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LISTA_MIEI_ORDINI_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getListaOrdini = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LISTA_ORDINI_REQUEST,
    });

    const {
      utenteLogin: { utenteInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${utenteInfo.auth_token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/orders/full_list`,
      config
    );

    dispatch({
      type: LISTA_ORDINI_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LISTA_ORDINI_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
