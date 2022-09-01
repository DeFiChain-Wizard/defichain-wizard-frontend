import { View, Text } from "react-native";
import React from "react";

type CardProps = {
  label: string;
  bare?: boolean;
  children?: React.ReactNode;
  [x: string]: any;
};

const Card = ({ label, bare = false, children, ...rest }: CardProps) => {
  return (
    <View className="flex space-y-1" {...rest}>
      <Text className="text-xs uppercase font-semibold text-[#6D7891]">
        {label}
      </Text>
      <View
        className={
          !bare &&
          "rounded-b-2xl rounded-tr-2xl border-2 border-[#3F4A63] bg-[#3F4A63]/20 p-4"
        }
      >
        {children}
      </View>
    </View>
  );
};

export default Card;
