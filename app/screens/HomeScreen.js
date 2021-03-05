import React, { useState, useEffect, useContext } from "react";
import { Dimensions, ScrollView, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Report from "../components/Report";
import { Context } from "../context/Context";
import PredictionScreen from "./PredictionScreen";
import SelectHome from "../components/SelectHome";

const width = Dimensions.get("window").width;

export default function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [ready, setReady] = useState(false);
  const {
    coords,
    dataFromCity,
    dataFromCoords,
    listLocations,
    setCoords,
    setHome,
    home,
  } = useContext(Context);

  // Homecity
  useEffect(() => {
    setReady(false);
    effect();
    setReady(true);
  }, [home]);

  const effect = async () => {
    let homecity = await AsyncStorage.getItem("homecity");
    if (homecity) {
      setHome(homecity);
    }
  };

  // get location from phone
  useEffect(() => {
    setReady(false);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoords({ lat: coords.latitude, lon: coords.longitude });
      },
      (err) => {
        console.log(err);
        console.log("Can't get location. switching to home location.");
      }
    );
    setReady(true);
  }, []);

  // get data for specific location
  useEffect(() => {
    eff();
  }, [coords, home]);

  const eff = async () => {
    setRefreshing(true);
    if (coords.lat && coords.lon) await dataFromCoords(coords);
    else if (home) await dataFromCity(home);
    listLocations();
    setRefreshing(false);
  };
  return (
    <>
      {home ? (
        <ScrollView
          horizontal
          decelerationRate="normal"
          snapToInterval={width}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={eff} />
          }
        >
          <Report navigation={navigation} />
          <PredictionScreen />
        </ScrollView>
      ) : (
        <SelectHome />
      )}
    </>
  );
}
