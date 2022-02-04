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
} from "../constants/utenteConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: UTENTE_LOGIN_REQUEST,
    });

    // const config = {
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    // };

    const { data } = await axios.post("/auth/login", {
      user: {
        email: email,
        password: password,
      },
    });

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
};

export const registrazione =
  (name, email, password, password_confirmation) => async (dispatch) => {
    try {
      dispatch({
        type: UTENTE_REGISTRAZIONE_REQUEST,
      });

      // const config = {
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      // };

      const { data } = await axios.post("/users", {
        user: {
          name: name,
          email: email,
          password: password,
          password_confirmation: password_confirmation,
        },
      });

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

    const { data } = await axios.get(`/users/${id}`, config);

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

      const { data } = await axios.put(`/users/${id}`, utente, config);

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
