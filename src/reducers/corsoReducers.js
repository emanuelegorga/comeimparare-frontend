import {
  CORSO_LIST_REQUEST,
  CORSO_LIST_SUCCESS,
  CORSO_LIST_FAIL,
  CORSO_PROPERTIES_REQUEST,
  CORSO_PROPERTIES_SUCCESS,
  CORSO_PROPERTIES_FAIL,
} from "../constants/corsoConstants";

export const corsoListReducers = (state = { corsi: [] }, action) => {
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

export const corsoPropertiesReducers = (
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
