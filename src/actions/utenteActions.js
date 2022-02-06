import axios from "axios";
import {
  UTENTE_LOGIN_REQUEST,
  UTENTE_LOGIN_SUCCESS,
  UTENTE_LOGIN_FAIL,
  UTENTE_LOGOUT,
  UTENTE_REGISTRAZIONE_REQUEST,
  UTENTE_REGISTRAZIONE_SUCCESS,
  UTENTE_REGISTRAZIONE_FAIL,
  UTENTE_ACCOUNT_REQUEST,
  UTENTE_ACCOUNT_SUCCESS,
  UTENTE_ACCOUNT_FAIL,
  UTENTE_ACCOUNT_RESET,
  UTENTE_UPDATE_ACCOUNT_REQUEST,
  UTENTE_UPDATE_ACCOUNT_SUCCESS,
  UTENTE_UPDATE_ACCOUNT_FAIL,
  LISTA_UTENTI_REQUEST,
  LISTA_UTENTI_SUCCESS,
  LISTA_UTENTI_FAIL,
  LISTA_UTENTI_RESET,
  ELIMINA_UTENTE_REQUEST,
  ELIMINA_UTENTE_SUCCESS,
  ELIMINA_UTENTE_FAIL,
  UTENTE_UPDATE_REQUEST,
  UTENTE_UPDATE_SUCCESS,
  UTENTE_UPDATE_FAIL,
} from "../constants/utenteConstants";

import { LISTA_MIEI_ORDINI_RESET } from "../constants/ordineConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: UTENTE_LOGIN_REQUEST,
    });

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      {
        user: {
          email: email,
          password: password,
        },
      }
    );

    dispatch({
      type: UTENTE_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("utenteInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: UTENTE_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("utenteInfo");
  dispatch({ type: UTENTE_LOGOUT });
  dispatch({ type: UTENTE_ACCOUNT_RESET });
  dispatch({ type: LISTA_MIEI_ORDINI_RESET });
};

export const registrazione =
  (name, email, password, password_confirmation) => async (dispatch) => {
    try {
      dispatch({
        type: UTENTE_REGISTRAZIONE_REQUEST,
      });

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/users`,
        {
          user: {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation,
          },
        }
      );

      dispatch({
        type: UTENTE_REGISTRAZIONE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: UTENTE_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("utenteInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: UTENTE_REGISTRAZIONE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUtenteAccount = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UTENTE_ACCOUNT_REQUEST,
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
      `${process.env.REACT_APP_API_URL}/users/${id}`,
      config
    );

    dispatch({
      type: UTENTE_ACCOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UTENTE_ACCOUNT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUtenteAccount =
  (utente, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UTENTE_UPDATE_ACCOUNT_REQUEST,
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

      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/users/${id}`,
        utente,
        config
      );

      dispatch({
        type: UTENTE_UPDATE_ACCOUNT_SUCCESS,
        payload: data,
      });

      const loginData = {
        user: {
          email: utente.user.email,
          password: utente.user.password,
        },
      };

      dispatch({
        type: UTENTE_LOGIN_SUCCESS,
        payload: loginData,
      });

      utenteInfo.name = utente.user.name;

      localStorage.setItem("utenteInfo", JSON.stringify(utenteInfo));
    } catch (error) {
      dispatch({
        type: UTENTE_UPDATE_ACCOUNT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getListaUtenti = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LISTA_UTENTI_REQUEST,
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
      `${process.env.REACT_APP_API_URL}/users`,
      config
    );

    dispatch({
      type: LISTA_UTENTI_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LISTA_UTENTI_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const eliminaUtente = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ELIMINA_UTENTE_REQUEST,
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

    const { data } = await axios.delete(
      `${process.env.REACT_APP_API_URL}/users/${id}`,
      config
    );

    dispatch({
      type: ELIMINA_UTENTE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ELIMINA_UTENTE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUtente = (utente) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UTENTE_UPDATE_REQUEST,
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

    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/users/${utente.id}`,
      utente,
      config
    );

    dispatch({
      type: UTENTE_UPDATE_SUCCESS,
    });

    dispatch({
      type: UTENTE_ACCOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UTENTE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
