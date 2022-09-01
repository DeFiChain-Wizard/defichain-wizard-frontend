import { View, Text } from "react-native";
import React from "react";

type TitleProps = {
  title: string;
  [key: string]: any;
};

const Title = ({ title }: TitleProps) => {
  return (
    <Text className="text-white w-64 text-lg tracking-[8px] uppercase text-center self-center mt-4 mb-12">
      {title}
    </Text>
  );
};

export default Title;
