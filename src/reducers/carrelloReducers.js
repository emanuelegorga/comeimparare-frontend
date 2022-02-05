import {
  CARRELLO_ADD_ITEM,
  CARRELLO_REMOVE_ITEM,
  CARRELLO_METODO_PAGAMENTO,
  PULISCI_CARRELLO,
} from "../constants/carrelloConstants";

export const carrelloReducer = (state = { carrelloItems: [] }, action) => {
  switch (action.type) {
    case CARRELLO_ADD_ITEM:
      const item = action.payload;
      const existItem = state.carrelloItems.find((x) => x.title === item.title);

      if (existItem) {
        return {
          ...state,
          carrelloItems: state.carrelloItems.map((x) =>
            x.title === existItem.title ? item : x
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

    case CARRELLO_METODO_PAGAMENTO:
      return {
        ...state,
        metodoPagamento: action.payload,
      };

    case PULISCI_CARRELLO:
      return {
        ...state,
        carrelloItems: [],
      };

    default:
      return state;
  }
};
