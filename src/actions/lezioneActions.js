import axios from "axios";

import {
  LEZIONE_PROPERTIES_REQUEST,
  LEZIONE_PROPERTIES_SUCCESS,
  LEZIONE_PROPERTIES_FAIL,
  LEZIONE_CREA_REQUEST,
  LEZIONE_CREA_SUCCESS,
  LEZIONE_CREA_FAIL,
} from "../constants/lezioneConstants";

export const listLezioneProperties =
  (id, corso_id) => async (dispatch, getState) => {
    try {
      dispatch({ type: LEZIONE_PROPERTIES_REQUEST });

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
        `/courses/${corso_id}/lectures/${id}`,
        config
      );

      dispatch({
        type: LEZIONE_PROPERTIES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LEZIONE_PROPERTIES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const creaLezione = (payload) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LEZIONE_CREA_REQUEST,
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

    console.log(payload);

    const { data } = await axios.post(
      `/courses/${payload.corsoId}/lectures`,
      payload,
      config
    );

    dispatch({
      type: LEZIONE_CREA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LEZIONE_CREA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
