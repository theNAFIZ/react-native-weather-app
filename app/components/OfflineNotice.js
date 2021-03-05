import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

var not;

const OfflineNotice = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  const netInfo = useNetInfo();
  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false) {
    not = true;
    return (
      <>
        {visible ? (
          <View style={styles.container}>
            <Text style={styles.text}>
              <MaterialCommunityIcons
                adjustsFontSizeToFit
                color={colors.white}
                name="network-strength-off-outline"
              />{" "}
              No internet connection
            </Text>
          </View>
        ) : (
          <View style={styles.icon}>
            <MaterialCommunityIcons
              name="network-strength-off-outline"
              color={colors.white}
              size={20}
            />
          </View>
        )}
      </>
    );
  } else {
    not = false;
    return (
      <>
        {visible && (
          <View style={styles.container}>
            <Text style={styles.text}>
              <MaterialCommunityIcons
                adjustsFontSizeToFit
                color={colors.white}
                name="network-strength-4"
              />{" "}
              You are online!
            </Text>
          </View>
        )}
      </>
    );
  }
};

export default OfflineNotice;

const styles = StyleSheet.create({
  container: {
    backgroundColor: not ? "red" : "green",
    width: "100%",
    height: 26,
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    color: colors.white,
  },
  icon: {
    backgroundColor: "red",
    alignItems: "center",
    position: "absolute",
    right: 0,
    padding: 10,
  },
});
