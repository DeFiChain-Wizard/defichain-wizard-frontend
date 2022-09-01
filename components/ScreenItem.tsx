import { View, Text } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type ScreenItemProps = {
  label: string | React.ReactNode;
  icon?: any;
  iconColor?: string;
  children: React.ReactNode;
  [x: string]: any;
};

const ScreenItem = ({
  label,
  icon,
  iconColor = "#838383",
  children,
  ...rest
}: ScreenItemProps) => {
  return (
    <View className="space-y-1.5" {...rest}>
      <View className="flex flex-row items-center space-x-1.5">
        {icon && (
          <MaterialCommunityIcons name={icon} size={24} color={iconColor} />
        )}
        <View className="flex-1">
          {typeof label === "string" && (
            <Text className="text-xs font-semibold text-[#838383] uppercase">
              {label}
            </Text>
          )}

          {typeof label === "object" && label}
        </View>
      </View>
      {children}
    </View>
  );
};

export default ScreenItem;
