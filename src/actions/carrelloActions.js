import axios from "axios";
import {
  CARRELLO_ADD_ITEM,
  CARRELLO_REMOVE_ITEM,
} from "../constants/carrelloConstants";

export const aggiungiAlCarrello = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/courses/${id}`);

  dispatch({
    type: CARRELLO_ADD_ITEM,
    payload: {
      id: data.id,
      title: data.title,
      logo: data.logo,
      difficulty: data.difficulty,
      language: data.language,
      description: data.description,
      summary: data.summary,
      price: data.price,
    },
  });

  localStorage.setItem(
    "carrelloItems",
    JSON.stringify(getState().carrello.carrelloItems)
  );
};

export const rimuoviDaCarrello = (id) => (dispatch, getState) => {
  dispatch({
    type: CARRELLO_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem(
    "carrelloItems",
    JSON.stringify(getState().carrello.carrelloItems)
  );
};
