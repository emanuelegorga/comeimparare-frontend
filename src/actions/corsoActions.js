import axios from "axios";
import {
  CORSO_LIST_REQUEST,
  CORSO_LIST_SUCCESS,
  CORSO_LIST_FAIL,
  CORSO_LATEST_REQUEST,
  CORSO_LATEST_SUCCESS,
  CORSO_LATEST_FAIL,
  CORSO_PROPERTIES_REQUEST,
  CORSO_PROPERTIES_SUCCESS,
  CORSO_PROPERTIES_FAIL,
  ELIMINA_CORSO_REQUEST,
  ELIMINA_CORSO_SUCCESS,
  ELIMINA_CORSO_FAIL,
  CREA_CORSO_REQUEST,
  CREA_CORSO_SUCCESS,
  CREA_CORSO_FAIL,
  CORSO_UPDATE_REQUEST,
  CORSO_UPDATE_SUCCESS,
  CORSO_UPDATE_FAIL,
  CORSO_UPDATE_RATE_REQUEST,
  CORSO_UPDATE_RATE_SUCCESS,
  CORSO_UPDATE_RATE_FAIL,
  CORSI_MIGLIORI_REQUEST,
  CORSI_MIGLIORI_SUCCESS,
  CORSI_MIGLIORI_FAIL,
} from "../constants/corsoConstants";

export const listCorsi =
  (params = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: CORSO_LIST_REQUEST });

      const { data } = await axios.get(`/courses${params}`);

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

export const listLatestCorsi = () => async (dispatch) => {
  try {
    dispatch({ type: CORSO_LATEST_REQUEST });

    const { data } = await axios.get("/courses/latest");

    dispatch({
      type: CORSO_LATEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CORSO_LATEST_FAIL,
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

export const eliminaCorso = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ELIMINA_CORSO_REQUEST,
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

    const { data } = await axios.delete(`/courses/${id}`, config);

    dispatch({ type: ELIMINA_CORSO_SUCCESS });
  } catch (error) {
    dispatch({
      type: ELIMINA_CORSO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const creaCorso = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREA_CORSO_REQUEST,
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

    const corso = {
      title: "test",
      description: "test",
      summary: "test",
      difficulty: "easy",
      language: "english",
      price: 10,
    };

    const { data } = await axios.post(`/courses`, corso, config);

    dispatch({
      type: CREA_CORSO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREA_CORSO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCorso = (corso) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CORSO_UPDATE_REQUEST,
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

    const { data } = await axios.put(`/courses/${corso.id}`, corso, config);

    dispatch({
      type: CORSO_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({ type: CORSO_PROPERTIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CORSO_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCorsoRate = (id, rate) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CORSO_UPDATE_RATE_REQUEST,
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

    const { data } = await axios.put(
      `/courses/${id}/rate_course`,
      rate,
      config
    );

    dispatch({
      type: CORSO_UPDATE_RATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CORSO_UPDATE_RATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCorsiMigliori = () => async (dispatch) => {
  try {
    dispatch({ type: CORSI_MIGLIORI_REQUEST });

    const { data } = await axios.get(`/courses/top`);

    dispatch({
      type: CORSI_MIGLIORI_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CORSI_MIGLIORI_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
