import {
  CREA_ORDINE_REQUEST,
  CREA_ORDINE_SUCCESS,
  CREA_ORDINE_FAIL,
  CREA_ORDINE_RESET,
  DETTAGLI_ORDINE_REQUEST,
  DETTAGLI_ORDINE_SUCCESS,
  DETTAGLI_ORDINE_FAIL,
  LISTA_ORDINI_REQUEST,
  LISTA_ORDINI_SUCCESS,
  LISTA_ORDINI_FAIL,
  LISTA_ORDINI_RESET,
} from "../constants/ordineConstants";

export const ordineCreaReducer = (state = {}, action) => {
  switch (action.type) {
    case CREA_ORDINE_REQUEST:
      return {
        loading: true,
      };

    case CREA_ORDINE_SUCCESS:
      return {
        loading: false,
        success: true,
        ordine: action.payload,
      };

    case CREA_ORDINE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CREA_ORDINE_RESET:
      return {};

    default:
      return state;
  }
};

export const ordineDettagliReducer = (
  state = { loading: true, ordineItems: [] },
  action
) => {
  switch (action.type) {
    case DETTAGLI_ORDINE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DETTAGLI_ORDINE_SUCCESS:
      return {
        loading: false,
        ordine: action.payload,
      };

    case DETTAGLI_ORDINE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const listaMieiOrdiniReducer = (state = { ordini: [] }, action) => {
  switch (action.type) {
    case LISTA_ORDINI_REQUEST:
      return {
        loading: true,
      };

    case LISTA_ORDINI_SUCCESS:
      return {
        loading: false,
        ordini: action.payload,
      };

    case LISTA_ORDINI_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case LISTA_ORDINI_RESET:
      return { ordini: [] };

    default:
      return state;
  }
};
