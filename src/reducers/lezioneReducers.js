import {
  LEZIONE_PROPERTIES_REQUEST,
  LEZIONE_PROPERTIES_SUCCESS,
  LEZIONE_PROPERTIES_FAIL,
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
