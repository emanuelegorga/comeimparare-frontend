import {
  LEZIONE_PROPERTIES_REQUEST,
  LEZIONE_PROPERTIES_SUCCESS,
  LEZIONE_PROPERTIES_FAIL,
  LEZIONE_CREA_REQUEST,
  LEZIONE_CREA_SUCCESS,
  LEZIONE_CREA_FAIL,
  LEZIONE_CREA_RESET,
} from "../constants/lezioneConstants";

export const lezionePropertiesReducer = (state = { lezione: {} }, action) => {
  switch (action.type) {
    case LEZIONE_PROPERTIES_REQUEST:
      return { loading: true, ...state };

    case LEZIONE_PROPERTIES_SUCCESS:
      return {
        loading: false,
        lezione: action.payload,
      };

    case LEZIONE_PROPERTIES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const lezioneCreaReducer = (state = {}, action) => {
  switch (action.type) {
    case LEZIONE_CREA_REQUEST:
      return { loading: true };

    case LEZIONE_CREA_SUCCESS:
      return { loading: false, success: true, lezione: action.payload };

    case LEZIONE_CREA_FAIL:
      return { loading: false, error: action.payload };

    case LEZIONE_CREA_RESET:
      return {};

    default:
      return state;
  }
};
