import React, { useState, useContext } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import weatherApi from "../api/weather";
import colors from "../config/colors";
import { Context } from "../context/Context";

const SelectHome = () => {
  const [home, onChangeText] = useState();
  const { setHome } = useContext(Context);

  const handlePress = async () => {
    const data = await weatherApi.getCity(home);
    if (data && data.loc && data.loc.city) {
      await AsyncStorage.setItem("homecity", data.loc.city);
      setHome(data.loc.city);
    } else {
      console.log("Error! Something went wrong setting the homecity");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter your Homecity</Text>
      <TextInput
        placeholder="Pippip"
        style={styles.textInput}
        placeholderTextColor={colors.text}
        value={home}
        onChangeText={(text) => onChangeText(text)}
      />
      <Button onPress={handlePress} title="Set" color={colors.light} />
    </View>
  );
};

export default SelectHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dark,
  },
  header: {
    height: 50,
    fontSize: 30,
    fontWeight: "bold",
    color: colors.dark,
    backgroundColor: colors.white,
  },
  textInput: {
    padding: 20,
    backgroundColor: colors.bg,
    height: 50,
    paddingLeft: 10,
    width: "100%",
    color: colors.white,
  },
});
