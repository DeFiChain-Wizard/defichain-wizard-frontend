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

import codePush from "react-native-code-push";
import { CODE_PUSH_KEY } from "react-native-dotenv";
import { Alert } from "react-native";

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
  const onCodePushStateChanged = async (state: codePush.SyncStatus) => {
    console.log("[CodePushStateChangeEvent]", state);

    switch(state) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        Alert.alert( "Codepush", "Checking for update.");
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        Alert.alert( "Codepush", "Downloading package.");
        break;
      case codePush.SyncStatus.AWAITING_USER_ACTION:
        Alert.alert( "Codepush", "Awaiting user action.");
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        Alert.alert( "Codepush", "Installing update.");
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        Alert.alert( "Codepush", "App up to date.");
        break;
      case codePush.SyncStatus.UPDATE_IGNORED:
        Alert.alert( "Codepush", "Update cancelled by user.");
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        Alert.alert( "Codepush", "Update installed and will be applied on restart.");
        break;
      case codePush.SyncStatus.UNKNOWN_ERROR:
        Alert.alert( "Codepush", "An unknown error occurred.");
        break;
    }
    if (state === codePush.SyncStatus.UPDATE_INSTALLED) {
      codePush.restartApp(true);
    }
  };

  useEffect(() => {
    codePush.notifyAppReady()

    codePush.sync(
      { 
        deploymentKey: CODE_PUSH_KEY,
        installMode: codePush.InstallMode.IMMEDIATE
      },
      onCodePushStateChanged,
      () => {}
    );
  }, []);

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
              <Stack.Screen name="Wallet" component={WalletScreen} />
              <Stack.Screen name="Seed" component={SeedScreen} />
              <Stack.Screen name="Password" component={PasswordScreen} />
              <Stack.Screen
                name="Collateral"
                component={CollateralRatioScreen}
              />
              <Stack.Screen name="Vault" component={VaultScreen} />
              <Stack.Screen name="Confirm" component={ConfirmScreen} />
              <Stack.Screen
                name="LiquidityPool"
                component={LiquidityPoolScreen}
              />
              <Stack.Screen name="Compounding" component={CompoundingScreen} />
              <Stack.Screen name="Internal" component={HomeStack} />
            </Stack.Navigator>
            <StatusBar style="light" />
          </SafeAreaProvider>
        </NavigationContainer>
      </TailwindProvider>
    </WhaleProvider>
  );
}
