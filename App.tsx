import "./shim";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { TailwindProvider } from "tailwindcss-react-native";
import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "./components/navigations/TabBar";
import { WhaleProvider } from "./context/WhaleContext";
import DashboardScreen from "./screens/DashboardScreen";
import SettingsScreen from "./screens/SettingsScreen";
import InfoScreen from "./screens/InfoScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import WalletScreen from "./screens/appSetup/WalletScreen";
import SeedScreen from "./screens/appSetup/SeedScreen";
import PasswordScreen from "./screens/appSetup/PasswordScreen";
import CollateralRatioScreen from "./screens/botSetup/CollateralRatioScreen";
import LiquidityPoolScreen from "./screens/botSetup/LiquidityPoolScreen";
import CompoundingScreen from "./screens/botSetup/CompoundingScreen";
import ConfirmScreen from "./screens/botSetup/ConfirmScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import VaultScreen from "./screens/botSetup/VaultScreen";
import UserInstructionsScreen from "./screens/appSetup/UserInstructionsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#020102",
  },
};

function HomeStack() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        initialParams={{ icon: "home" }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        initialParams={{ icon: "setting" }}
      />
      <Tab.Screen
        name="Info"
        component={InfoScreen}
        initialParams={{ icon: "infocirlceo" }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <WhaleProvider>
        <TailwindProvider>
          <NavigationContainer theme={MyTheme}>
            <SafeAreaProvider>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Instructions" component={UserInstructionsScreen} />
                <Stack.Screen name="Wallet" component={WalletScreen} />
                <Stack.Screen name="Seed" component={SeedScreen} />
                <Stack.Screen name="Password" component={PasswordScreen} />
                <Stack.Screen
                  options={{ gestureEnabled: false }}
                  name="Collateral"
                  component={CollateralRatioScreen}
                />
                <Stack.Screen name="Vault" component={VaultScreen} />
                <Stack.Screen name="Confirm" component={ConfirmScreen} />
                <Stack.Screen
                  name="LiquidityPool"
                  component={LiquidityPoolScreen}
                />
                <Stack.Screen
                  name="Compounding"
                  component={CompoundingScreen}
                />
                <Stack.Screen name="Internal" component={HomeStack} />
              </Stack.Navigator>
              <StatusBar style="light" />
            </SafeAreaProvider>
          </NavigationContainer>
        </TailwindProvider>
    </WhaleProvider>
  );
}
