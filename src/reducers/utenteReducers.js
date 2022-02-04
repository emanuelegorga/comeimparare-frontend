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
