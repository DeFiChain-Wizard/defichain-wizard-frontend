import { TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const Tab = ({ active, tab, onPress, icon }: any) => {
  const iconColor = active ? "white" : "#838383";
  const backgroundColor = active ? "black" : "transparent";

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex items-center ${
        active && "border-2 border-white"
      } justify-center w-14 h-14 rounded-full`}
      style={{ backgroundColor }}
    >
      {!!icon && <AntDesign name={icon} size={24} color={iconColor} />}
    </TouchableOpacity>
  );
};

export default Tab;
