import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "./app/config/colors";
import { ContextProvider } from "./app/context/Context";

import HomeScreen from "./app/screens/HomeScreen";
import MenuScreen from "./app/screens/MenuScreen";
import OfflineNotice from "./app/components/OfflineNotice";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ContextProvider>
      <StatusBar backgroundColor={colors.white} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Menu"
            component={MenuScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <OfflineNotice />
    </ContextProvider>
  );
}
