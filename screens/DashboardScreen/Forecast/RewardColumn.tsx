import React from "react";
import { View, Text } from "react-native";
import { Reward } from "../../../types/defichainIncome";
import RewardItem from "./RewardItem";

type RewardColumnProps = {
  reward: Reward;
  unit: string;
};

const RewardColumn = ({ reward, unit }: RewardColumnProps) => {
  const { dfi, usd } = reward;

  return (
    <View className="flex flex-row justify-between w-full">
      <Text className="text-white w-16 capitalize text-lg">{unit}</Text>
      <RewardItem value={dfi.toFixed(2)} symbol="DFI" position="right" />
      <RewardItem value={usd.toFixed(2)} symbol="$" />
    </View>
  );
};

export default RewardColumn;
