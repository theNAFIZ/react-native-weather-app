import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header";
import colors from "../config/colors";
import { Context } from "../context/Context";

const width = Dimensions.get("window").width;

const MenuScreen = ({ navigation }) => {
  const { list, setActive, listLocations } = useContext(Context);
  useEffect(() => {
    listLocations();
  }, []);
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      {list.length > 0 && (
        <>
          <Text style={styles.title}>Saved Locations</Text>

          <FlatList
            data={list}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  setActive(item);
                  navigation.navigate("Home");
                }}
              >
                <Text style={{ color: colors.white }}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.bg,
  },
  title: {
    fontSize: 20,
    backgroundColor: "rgba(30, 30, 30, 0.6)",
    color: colors.text,
    width: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    height: 50,
  },
  btn: {
    alignItems: "center",
    backgroundColor: colors.dark,
    padding: 20,
    marginVertical: 8,
    width: width * 0.9,
  },
});
