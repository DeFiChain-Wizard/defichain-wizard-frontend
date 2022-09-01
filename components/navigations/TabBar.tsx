import { View, Dimensions } from "react-native";
import React, { useState } from "react";
import Tab from "./Tab";

const { width } = Dimensions.get("screen");

const TabBar = ({ state, navigation }) => {
  const { routes } = state;
  const [selected, setSelected] = useState("Dashboard");

  const isActive = (currentTab: string) =>
    currentTab === selected ? true : false;

  const handlePress = (activeTab: string, index: number) => {
    if (state.index !== index) {
      setSelected(activeTab);
      navigation.navigate(activeTab);
    }
  };

  return (
    <View
      className="absolute bottom-8 items-center justify-center"
      style={{ width: width }}
    >
      <View className="flex flex-row rounded-full w-64 justify-between p-0.5">
        {routes.map((route, index) => (
          <Tab
            tab={route}
            key={route.key}
            active={isActive(route.name)}
            icon={route.params.icon}
            // color={renderColor(route.name)}
            onPress={() => handlePress(route.name, index)}
          />
        ))}
      </View>
    </View>
  );
};

export default TabBar;
