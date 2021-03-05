import settings from "../config/settings";
import { create } from "apisauce";
import storage from "./storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiClient = create({
  baseURL: `https://api.openweathermap.org/data/2.5/`,
  timeout: 300000,
  timeoutErrorMessage: "Timeout Error: Slow or no connection.",
});

const getCity = async (city) => {
  try {
    const current = await apiClient.get(
      `weather?q=${city}&appid=${settings.apiKey}`
    );
    if (current.ok) {
      if (current.data.cod !== 200) {
        return;
      }
      const loc = {
        city: current.data.name,
        country: current.data.sys.country,
      };
      const onecall = await onecallReq(
        loc,
        current.data.coord.lat,
        current.data.coord.lon
      );

      if (onecall) {
        return {
          loc,
          data: onecall,
        };
      } else return;
    } else return;
  } catch (err) {
    console.error(err);
    return;
  }
};

const getCoords = async (lat, lon) => {
  try {
    // Here try to get from storage
    const current = await apiClient.get(
      `weather?lat=${lat}&lon=${lon}&appid=${settings.apiKey}`
    );
    if (current.ok) {
      if (current.data.cod !== 200) return;
      const loc = {
        city: current.data.name,
        country: current.data.sys.country,
      };
      const onecall = await onecallReq(
        loc,
        current.data.coord.lat,
        current.data.coord.lon
      );

      if (onecall) {
        return {
          loc,
          data: onecall,
        };
      } else return;
    } else return;
  } catch (err) {
    console.error(err);
    return;
  }
};

const onecallReq = async (loc, lat = 0, lon = 0) => {
  var res = await apiClient.get(
    `onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${settings.apiKey}`
  );
  // downloaded
  if (res.ok) {
    await storage.storeItems({ loc, ...res.data });
    return await storage.formatResponse({ loc, ...res.data });
  } // cached
  else {
    if (loc && loc.city) res = await storage.getItems(loc.city);
    else {
      loc.city = await AsyncStorage.getItem("homecity");
      res = await storage.getItems(loc.city);
    }
    return res;
  }
};

export default { getCity, getCoords };
