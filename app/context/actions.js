import weatherApi from "../api/weather";

export const SET_CITY = "SET_CITY";
export const SET_HOME = "SET_HOME";
export const SET_COORDS = "SET_COORDS";
export const SET_ACTIVE = "SET_ACTIVE";
export const DATA_CITY = "DATA_CITY";
export const DATA_COORD = "DATA_COORD";
export const LIST_LOCATIONS = "LIST_LOCATIONS";
export const ERROR = "ERROR";

export const createActions = (dispatch) => ({
  listLocations: () => {
    dispatch({
      type: LIST_LOCATIONS,
    });
  },

  setHome: (city) => {
    dispatch({
      type: SET_HOME,
      payload: city,
    });
  },

  setActive: (city) => {
    dispatch({
      type: SET_ACTIVE,
      payload: city,
    });
  },

  setCity: (formData) => {
    dispatch({
      type: SET_CITY,
      payload: formData,
    });
  },

  setCoords: (coord) => {
    try {
      dispatch({
        type: SET_COORDS,
        payload: { lat: coord.lat, lon: coord.lon }, //coords lat, lon
      });
    } catch (error) {
      console.log(error);
      //Error
      dispatch({
        type: ERROR,
        payload: "Couldn't get current location of your device",
      });
    }
  },

  dataFromCity: async (city) => {
    try {
      const wData = await weatherApi.getCity(city);
      if (!wData || !wData.data || !wData.data.current) {
        dispatch({
          type: ERROR,
          payload: "Corrupted Response dfct",
        });
      } else {
        dispatch({
          type: DATA_CITY,
          payload: wData,
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: ERROR,
        payload: "data from city error",
      });
    }
  },

  dataFromCoords: async ({ lat, lon }) => {
    try {
      const wData = await weatherApi.getCoords(lat, lon);
      if (!wData || !wData.data || !wData.data.current) {
        dispatch({
          type: ERROR,
          payload: "Corrupted Response dfco",
        });
      } else {
        dispatch({
          type: DATA_COORD,
          payload: wData,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR,
        payload: "data from coords error",
      });
    }
  },
});
