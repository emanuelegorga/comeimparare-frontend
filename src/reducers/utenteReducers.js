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
  UTENTE_UPDATE_ACCOUNT_RESET,
  LISTA_UTENTI_REQUEST,
  LISTA_UTENTI_SUCCESS,
  LISTA_UTENTI_FAIL,
  LISTA_UTENTI_RESET,
  ELIMINA_UTENTE_REQUEST,
  ELIMINA_UTENTE_SUCCESS,
  ELIMINA_UTENTE_FAIL,
} from "../constants/utenteConstants";

export const utenteLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case UTENTE_LOGIN_REQUEST:
      return { loading: true };

    case UTENTE_LOGIN_SUCCESS:
      return { loading: false, utenteInfo: action.payload };

    case UTENTE_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case UTENTE_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const utenteRegistrazioneReducer = (state = {}, action) => {
  switch (action.type) {
    case UTENTE_REGISTRAZIONE_REQUEST:
      return { loading: true };

    case UTENTE_REGISTRAZIONE_SUCCESS:
      return { loading: false, utenteInfo: action.payload };

    case UTENTE_REGISTRAZIONE_FAIL:
      return { loading: false, error: action.payload };

    case UTENTE_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const utenteAccountReducer = (state = { utente: {} }, action) => {
  switch (action.type) {
    case UTENTE_ACCOUNT_REQUEST:
      return { ...state, loading: true };

    case UTENTE_ACCOUNT_SUCCESS:
      return { loading: false, utente: action.payload };

    case UTENTE_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };

    case UTENTE_ACCOUNT_RESET:
      return { utente: {} };

    default:
      return state;
  }
};

export const utenteUpdateAccountReducer = (state = {}, action) => {
  switch (action.type) {
    case UTENTE_UPDATE_ACCOUNT_REQUEST:
      return { loading: true };

    case UTENTE_UPDATE_ACCOUNT_SUCCESS:
      return { loading: false, success: true, utenteInfo: action.payload };

    case UTENTE_UPDATE_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };

    case UTENTE_UPDATE_ACCOUNT_RESET:
      return {};

    default:
      return state;
  }
};

export const listaUtentiReducer = (state = { utenti: [] }, action) => {
  switch (action.type) {
    case LISTA_UTENTI_REQUEST:
      return { loading: true };

    case LISTA_UTENTI_SUCCESS:
      return { loading: false, utenti: action.payload };

    case LISTA_UTENTI_FAIL:
      return { loading: false, error: action.payload };

    case LISTA_UTENTI_RESET:
      return { utenti: [] };

    default:
      return state;
  }
};

export const utenteEliminaReducer = (state = {}, action) => {
  switch (action.type) {
    case ELIMINA_UTENTE_REQUEST:
      return { loading: true };

    case ELIMINA_UTENTE_SUCCESS:
      return { loading: false, success: true };

    case ELIMINA_UTENTE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
