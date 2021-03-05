import {
  SET_CITY,
  SET_COORDS,
  SET_ACTIVE,
  SET_HOME,
  DATA_CITY,
  DATA_COORD,
  LIST_LOCATIONS,
  ERROR,
} from "./actions";

export default function (state, action) {
  const { type, payload } = action;
  switch (type) {
    case LIST_LOCATIONS:
      return {
        ...state,
        list: Object.keys(state.weatherData),
        loading: false,
      };

    case SET_ACTIVE:
      return {
        ...state,
        active: payload,
        loading: false,
      };
    case SET_HOME:
      return {
        ...state,
        home: payload,
        loading: false,
      };
    case SET_CITY:
      return {
        ...state,
        city: payload,
        loading: false,
      };
    case SET_COORDS:
      return {
        ...state,
        coords: { lat: payload.lat, lon: payload.lon },
        loading: false,
      };
    case DATA_CITY:
    case DATA_COORD:
      return {
        ...state,
        weatherData: {
          ...state.weatherData,
          [payload.loc.city]: { data: payload.data, loc: payload.loc },
        },
        active: payload.loc.city,
        loading: false,
      };

    case ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
        errors: [...state.errors, payload],
      };
    }
    default:
      return state;
  }
}
