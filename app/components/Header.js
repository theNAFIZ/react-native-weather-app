import React, { useContext, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Context } from "../context/Context";
import colors from "../config/colors";

const Header = ({ navigation }) => {
  const [value, setValue] = useState("");
  const { setCity, dataFromCity } = useContext(Context);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Location"
        placeholderTextColor="#000"
        onChangeText={(text) => setValue(text)}
        value={value}
      />
      <View>
        <MaterialCommunityIcons
          style={styles.btn}
          name="magnify"
          size={15}
          color={colors.white}
          onPress={() => {
            setCity(value);
            dataFromCity(value);
            setValue("");
            navigation.navigate("Home");
          }}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 55,
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    zIndex: 1000,
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "#def",
    opacity: 0.8,
    width: "88%",
    height: "100%",
    borderWidth: 1,
    borderColor: "#777",
    fontSize: 15,
    paddingLeft: 20,
    borderRadius: 20,
  },
  btn: {
    backgroundColor: "#ccc",
    opacity: 0.7,
    padding: 7,
    height: "100%",
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 22,
  },
});
