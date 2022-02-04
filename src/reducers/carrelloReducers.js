import {
  CARRELLO_ADD_ITEM,
  CARRELLO_REMOVE_ITEM,
} from "../constants/carrelloConstants";

export const carrelloReducer = (state = { carrelloItems: [] }, action) => {
  switch (action.type) {
    case CARRELLO_ADD_ITEM:
      const item = action.payload;
      const existItem = state.carrelloItems.find((x) => x.corso === item.corso);

      if (existItem) {
        return {
          ...state,
          carrelloItems: state.carrelloItems.map((x) =>
            x.corso === existItem.corso ? item : x
          ),
        };
      } else {
        return {
          ...state,
          carrelloItems: [...state.carrelloItems, item],
        };
      }

    case CARRELLO_REMOVE_ITEM:
      return {
        ...state,
        carrelloItems: state.carrelloItems.filter(
          (x) => x.id !== action.payload
        ),
      };

    default:
      return state;
  }
};
