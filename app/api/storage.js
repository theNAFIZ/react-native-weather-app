import AsyncStorage from "@react-native-async-storage/async-storage";
import settings from "../config/settings";

const storeItems = async (item) => {
  try {
    await AsyncStorage.setItem(
      settings.storageKey + item.loc.city,
      JSON.stringify(item)
    );
  } catch (err) {
    console.log(err);
  }
};

const getItems = async (loc) => {
  try {
    var res = await AsyncStorage.getItem(settings.storageKey + loc);
    //console.log(res);
    if (res) {
      res = JSON.parse(res);
      res = checkValidity(res);
      return formatResponse(res);
    } else return;
  } catch (err) {
    console.log(err);
  }
};

const removeItem = async (loc) => {
  try {
    await AsyncStorage.removeItem(settings.storageKey + loc);
  } catch (err) {
    console.log(err);
  }
};

const checkValidity = (item) => {
  const now = new Date();
  var ts = Date(item.current.dt);
  if (
    Math.abs(ts - now) >
    7 * 24 * 60 * 60 * 1000 /* Time Difference: 7 days */
  ) {
    removeItem(item.loc);
    return null;
  } else {
    return item;
  }
};

const formatResponse = (data) => {
  var formatted = data;
  const now = new Date();

  // Current
  // // Date
  // if (now.getDate() != ts.getDate()) {
  //   let d = Math.abs(ts.getDate() - now.getDate()) % 7;
  //   formatted.current = data.daily[d];
  // }
  // // Hour
  // if (Math.abs(ts - now) < 48 * 60 * 60 * 1000) {
  //   for (
  //     var i = 0;
  //     Math.abs(ts - now) > 60 * 60 * 1000 && i < 48 /* 1 hour */;
  //     i++
  //   ) {
  //     ts = new Date(data.houtly[i].dt * 1000);
  //     if (Math.abs(ts - now) < 60 * 60 * 1000) {
  //       //temp, wind_speed, wind_deg, weather[] copy
  //     }
  //   }
  // }

  // Next Hours
  formatted.hourly = data.hourly.filter(
    (item) => new Date(item.dt * 1000) > now
  );
  // Next Days //Extra 12 hour taken
  formatted.daily = data.daily.filter(
    (item) => new Date(item.dt * 1000 - 12 * 60 * 60 * 1000) > now
  );
  // Current
  formatted.current = {
    dt: formatted.hourly[0].dt,
    sunrise: formatted.daily[0].sunrise,
    sunset: formatted.daily[0].sunset,
    tempC: formatted.hourly[0].temp,
    humidity: formatted.hourly[0].humidity,
    tempMin: formatted.daily[0].temp.min,
    tempMax: formatted.daily[0].temp.max,
    feel: formatted.hourly[0].feels_like,
    wind_speed: formatted.hourly[0].wind_speed,
    wind_deg: formatted.hourly[0].wind_deg,
    weather: formatted.hourly[0].weather,
  };
  return formatted;
};
export default { storeItems, getItems, formatResponse };
