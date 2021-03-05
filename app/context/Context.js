import React, { useReducer } from "react";
import { createActions } from "./actions";
import reducer from "./reducers";

const initialState = {
  city: "",
  coords: { lat: undefined, lon: undefined },
  active: "",
  home: "",
  weatherData: {},
  loading: true,
  error: false,
  list: [],
  errors: [],
};

const Context = React.createContext();

const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = createActions(dispatch);
  return (
    <Context.Provider value={{ ...state, ...actions }}>
      {props.children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
