import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
const Wind = ({ speed = 0, deg = 0 }) => {
  let color, dir;
  const windcolor = (speed) => {
    if (speed > 100) color = "#d9594d";
    else if (speed > 50) color = "#e28455";
    else if (speed > 20) color = "#ecad5f";
    else if (speed > 5) color = "#f4a262";
    else if (speed > 0) color = "#d5f36d";
    else color = "#fff";
  };
  const windDir = (deg) => {
    if (deg == 0) dir = "north";
    else if (deg > 0 && deg < 90) dir = "n/e";
    if (deg == 90) dir = "east";
    else if (deg > 90 && deg < 180) dir = "s/e";
    if (deg == 180) dir = "south";
    else if (deg > 180 && deg < 270) dir = "s/w";
    if (deg == 270) dir = "west";
    else if (deg > 270 && deg < 360) dir = "n/w";
    else;
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "transparent",
      justifyContent: "center",
      alignItems: "center",
    },
    direction: {
      transform: [{ rotate: `${deg}deg` }],
    },
    text: {
      color: colors.text,
      fontSize: 20,
    },
  });

  windcolor(speed);
  windDir(deg);
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        style={styles.direction}
        name="arrow-up-bold"
        size={60}
        color={color}
      />
      <Text style={styles.text}>
        {deg}° {dir}
      </Text>
      <Text style={styles.text}>{speed} kp/h</Text>
    </View>
  );
};

export default Wind;
