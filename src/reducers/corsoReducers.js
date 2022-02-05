import {
  CORSO_LIST_REQUEST,
  CORSO_LIST_SUCCESS,
  CORSO_LIST_FAIL,
  CORSO_PROPERTIES_REQUEST,
  CORSO_PROPERTIES_SUCCESS,
  CORSO_PROPERTIES_FAIL,
  ELIMINA_CORSO_REQUEST,
  ELIMINA_CORSO_SUCCESS,
  ELIMINA_CORSO_FAIL,
  CREA_CORSO_REQUEST,
  CREA_CORSO_SUCCESS,
  CREA_CORSO_FAIL,
  CREA_CORSO_RESET,
  CORSO_UPDATE_REQUEST,
  CORSO_UPDATE_SUCCESS,
  CORSO_UPDATE_FAIL,
  CORSO_UPDATE_RESET,
} from "../constants/corsoConstants";

export const corsoListReducer = (state = { corsi: [] }, action) => {
  switch (action.type) {
    case CORSO_LIST_REQUEST:
      return { loading: true, corsi: [] };

    case CORSO_LIST_SUCCESS:
      return { loading: false, corsi: action.payload };

    case CORSO_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const corsoPropertiesReducer = (
  state = { corso: {}, studenti: [], lezioni: [] },
  action
) => {
  switch (action.type) {
    case CORSO_PROPERTIES_REQUEST:
      return { loading: true, ...state };

    case CORSO_PROPERTIES_SUCCESS:
      return {
        loading: false,
        corso: action.payload,
        studenti: action.payload.joins,
        lezioni: action.payload.lectures,
      };

    case CORSO_PROPERTIES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const corsoEliminaReducer = (state = {}, action) => {
  switch (action.type) {
    case ELIMINA_CORSO_REQUEST:
      return { loading: true };

    case ELIMINA_CORSO_SUCCESS:
      return { loading: false, success: true };

    case ELIMINA_CORSO_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const corsoCreaReducer = (state = {}, action) => {
  switch (action.type) {
    case CREA_CORSO_REQUEST:
      return { loading: true };

    case CREA_CORSO_SUCCESS:
      return { loading: false, success: true, corso: action.payload };

    case CREA_CORSO_FAIL:
      return { loading: false, error: action.payload };

    case CREA_CORSO_RESET:
      return {};

    default:
      return state;
  }
};

export const corsoUpdateReducer = (state = { corso: {} }, action) => {
  switch (action.type) {
    case CORSO_UPDATE_REQUEST:
      return { loading: true };

    case CORSO_UPDATE_SUCCESS:
      return { loading: false, success: true, corso: action.payload };

    case CORSO_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case CORSO_UPDATE_RESET:
      return { corso: {} };

    default:
      return state;
  }
};
