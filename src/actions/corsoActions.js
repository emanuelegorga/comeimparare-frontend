import axios from "axios";
import {
  CORSO_LIST_REQUEST,
  CORSO_LIST_SUCCESS,
  CORSO_LIST_FAIL,
  CORSO_PROPERTIES_REQUEST,
  CORSO_PROPERTIES_SUCCESS,
  CORSO_PROPERTIES_FAIL,
} from "../constants/corsoConstants";

export const listCorsi = () => async (dispatch) => {
  try {
    dispatch({ type: CORSO_LIST_REQUEST });

    const { data } = await axios.get("/courses");

    dispatch({
      type: CORSO_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CORSO_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCorsoProperties = (id) => async (dispatch) => {
  try {
    dispatch({ type: CORSO_PROPERTIES_REQUEST });

    const { data } = await axios.get(`/courses/${id}`);

    dispatch({
      type: CORSO_PROPERTIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CORSO_PROPERTIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
