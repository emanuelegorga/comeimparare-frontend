import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  corsoListReducers,
  corsoPropertiesReducers,
} from "./reducers/corsoReducers";

const reducer = combineReducers({
  corsoList: corsoListReducers,
  corsoProperties: corsoPropertiesReducers,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
