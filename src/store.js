import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  corsoListReducer,
  corsoPropertiesReducer,
} from "./reducers/corsoReducers";
import { carrelloReducer } from "./reducers/carrelloReducers";
import {
  utenteLoginReducer,
  utenteRegistrazioneReducer,
  utenteAccountReducer,
  utenteUpdateAccountReducer,
} from "./reducers/utenteReducers";

const reducer = combineReducers({
  corsoList: corsoListReducer,
  corsoProperties: corsoPropertiesReducer,
  carrello: carrelloReducer,
  utenteLogin: utenteLoginReducer,
  utenteRegistrazione: utenteRegistrazioneReducer,
  utenteAccount: utenteAccountReducer,
  utenteUpdateAccount: utenteUpdateAccountReducer,
});

const carrelloItemsFromSstorage = localStorage.getItem("carrelloItems")
  ? JSON.parse(localStorage.getItem("carrelloItems"))
  : [];

const utenteInfoFromStorage = localStorage.getItem("utenteInfo")
  ? JSON.parse(localStorage.getItem("utenteInfo"))
  : null;

const initialState = {
  carrello: { carrelloItems: carrelloItemsFromSstorage },
  utenteLogin: { utenteInfo: utenteInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
