import React, { useContext } from "react";
import {
  Dimensions,
  ImageBackground,
  FlatList,
  View,
  Text,
} from "react-native";
import { Context } from "../context/Context";
import Item from "../components/Item";
const height = Dimensions.get("window").height - 10;
const width = Dimensions.get("window").width;

const PredictionScreen = () => {
  const { weatherData, active } = useContext(Context);
  const data = weatherData[active] ? weatherData[active].data : undefined;
  return (
    <ImageBackground
      source={require("../assets/day-bg.jpg")}
      style={{ height: height, width: width }}
    >
      <View>
        <Text
          style={{
            backgroundColor: "rgba(220, 220, 220, 0.7)",
            color: "#1D71F2",
            fontSize: 26,
            fontWeight: "bold",
            textAlign: "center",
            textAlignVertical: "center",
          }}
        >
          Predictions
        </Text>
        {data ? (
          <FlatList
            data={data.daily}
            renderItem={({ item }) => (
              <Item
                weather={item.weather[0]}
                temp={{ min: item.temp.min, max: item.temp.max }}
                time={item.dt}
                timezone={data.timezone_offset}
                type="daily"
              />
            )}
            keyExtractor={(item, index) => item + index}
          />
        ) : (
          <Text>No data found</Text>
        )}
      </View>
    </ImageBackground>
  );
};
export default PredictionScreen;
