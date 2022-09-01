import { View, Text } from "react-native";
import React from "react";

type ValidationErrorProps = {
  error: string;
};

const ValidationError = ({ error }: ValidationErrorProps) => {
  return <Text className="text-[#F06666] mt-2">{error}</Text>;
};

export default ValidationError;
