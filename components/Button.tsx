import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type ButtonProps = {
  label: string;
  type?: "primary" | "secondary";
  size?: "small" | "medium";
  [x: string]: any;
};
const Button = ({
  label,
  type = "primary",
  size = "medium",
  ...rest
}: ButtonProps) => {
  return (
    <TouchableOpacity
      {...rest}
      className={`flex justify-center border-2 ${
        type === "primary" ? "border-white" : "border-[#838383]"
      } px-5 py-3 rounded-full`}
    >
      <Text
        className={`${
          type === "primary" ? "text-white" : "text-[#838383]"
        } text-xs font-semibold`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
