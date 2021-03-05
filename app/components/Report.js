import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  ActivityIndicator,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from "dayjs";

import colors from "../config/colors";
import { dateFormatter, iconFormatter } from "../utils";
import { Context } from "../context/Context";
import Item from "./Item";
import Wind from "./Wind";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Report({ navigation }) {
  const { active, loading, error, weatherData, errors } = useContext(Context);
  const { data, loc } = weatherData[active]
    ? weatherData[active]
    : { data: undefined, loc: undefined };

  var theme = require("../assets/day-bg.jpg");
  if (data) {
    theme =
      data.current.weather[0].icon[2] == "n"
        ? require("../assets/night-bg.jpg")
        : require(`../assets/day-bg.jpg`);
  }

  return (
    <View>
      <ImageBackground
        source={theme}
        blurRadius={4}
        style={{ flex: 1, height: height, width: width }}
      >
        {loading ? (
          <ActivityIndicator animating={loading} />
        ) : (
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.menu}
              onPress={() => {
                navigation.navigate("Menu");
              }}
            >
              <MaterialCommunityIcons
                name="menu"
                size={35}
                color={colors.dark}
              />
            </TouchableOpacity>
            {error && errors.forEach((er) => <Text>{er}</Text>)}

            {data && (
              <View style={styles.container}>
                <Text style={styles.location}>
                  {loc.city}, {loc.country}
                </Text>
                <Text style={styles.h4}>
                  {dayjs(
                    dateFormatter(data.current.dt, data.timezone_offset)
                  ).format("ddd, DD MMM 'YY")}
                </Text>

                <View style={styles.image}>
                  <MaterialCommunityIcons
                    name={iconFormatter(data.current.weather[0])}
                    size={50}
                    color={colors.white}
                  />
                </View>
                <Text style={styles.h3}>{data.current.weather[0].main}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: width,
                    backgroundColor: "rgba(220, 220, 220, 0.3)",
                    paddingHorizontal: 5,
                  }}
                >
                  <Text style={styles.h4}>
                    {"Min: \n"}
                    {Math.round(data.current.tempMin - 273)}°C
                  </Text>
                  <Text style={styles.h1}>
                    {Math.round(data.current.tempC - 273)}°C
                  </Text>
                  <Text style={styles.h4}>
                    {"Max: \n"}
                    {Math.round(data.current.tempMax - 273)}°C
                  </Text>
                </View>
                <Text style={styles.h4}>
                  Feels Like : {Math.round(data.current.feel - 273)}°C
                </Text>
                <View style={styles.times}>
                  <Text style={styles.h4}>
                    Sunrise {" \n"}
                    {dayjs(
                      dateFormatter(data.current.sunrise, data.timezone_offset)
                    ).format("hh:mm A")}
                  </Text>
                  <Text style={styles.h4}>
                    Sunset{" \n"}
                    {dayjs(
                      dateFormatter(data.current.sunset, data.timezone_offset)
                    ).format("hh:mm A")}
                  </Text>
                </View>
                <Wind
                  deg={data.current.wind_deg}
                  speed={data.current.wind_speed}
                />
                <FlatList
                  horizontal
                  data={data.hourly.slice(0, 4)}
                  renderItem={({ item }) => (
                    <Item
                      weather={item.weather[0]}
                      temp={item.temp}
                      time={item.dt}
                      timezone={data.timezone_offset}
                      type="hourly"
                    />
                  )}
                  keyExtractor={(item, index) => item + index}
                />
              </View>
            )}
          </View>
        )}
      </ImageBackground>
    </View>
  );
}

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    height: height,
    width: width,
  },
  h1: {
    fontSize: 40,
    color: colors.text,
  },
  h3: {
    fontSize: 30,
    color: colors.text,
  },
  h4: {
    fontSize: 20,
    color: colors.text,
  },
  location: {
    fontSize: 26,
    color: colors.text,
    fontWeight: "600",
  },
  image: {
    height: 80,
    width: 80,
    padding: 10,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(10, 10, 10, 0.3)",
  },
  times: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
  menu: {
    alignItems: "center",
    justifyContent: "center",
    margin: 12,
    zIndex: 100000,
    left: 0,
    top: 0,
    position: "absolute",
  },
});
