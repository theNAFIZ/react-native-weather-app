import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import dayjs from "dayjs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import { dateFormatter, iconFormatter } from "../utils";
const Item = ({ weather, temp, time, timezone, type }) => {
  const width = Dimensions.get("window").width - 40;
  const height = Dimensions.get("window").height;
  return (
    <View>
      {type == "hourly" ? (
        <View style={[styles.container, { width: width / 4 }]}>
          <MaterialCommunityIcons
            name={iconFormatter(weather)}
            size={25}
            color={colors.white}
          />
          <Text style={styles.temp}>{Math.round(temp - 273)}°C</Text>
          <Text style={styles.time}>
            {dayjs(dateFormatter(time, timezone)).format("hh:mm A")}
          </Text>
        </View>
      ) : (
        <View
          style={[
            styles.container,
            { flexDirection: "row", maxHeight: height / 7 },
          ]}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              width: width / 3,
            }}
          >
            <MaterialCommunityIcons
              name={iconFormatter(weather)}
              size={30}
              color={colors.white}
            />
            <Text style={styles.temp}>{weather.main}</Text>
          </View>
          <View
            style={{
              alignItems: "baseline",
              flexDirection: "column",
              width: width / 3,
            }}
          >
            <Text style={styles.temp}>Min: {Math.round(temp.min - 273)}°C</Text>
            <Text style={styles.temp}>Max: {Math.round(temp.max - 273)}°C</Text>
          </View>
          <Text
            style={[
              styles.time,
              { fontSize: 16, fontWeight: "500", width: width / 3 },
            ]}
          >
            {dayjs(dateFormatter(time, timezone)).format("dddd")}
            {"\n"}
            {dayjs(dateFormatter(time, timezone)).format("DD MMM")}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: colors.bg,
    borderRadius: 10,
    margin: 5,
    paddingVertical: 5,
  },
  icon: {
    height: 30,
    width: 30,
    padding: 10,
  },
  temp: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    paddingHorizontal: 5,
  },
  time: {
    fontSize: 12,
    color: colors.text,
    fontWeight: "400",
    paddingHorizontal: 5,
  },
});
export default Item;
