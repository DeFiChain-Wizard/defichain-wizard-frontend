import React from "react";
import { View } from "react-native";
import { DefichainIncome, Rewards } from "../../../types/DefichainIncome";
import RewardColumn from "./RewardColumn";

type ForeCastProps = {
  data: DefichainIncome;
};
const Forecast = ({ data }: ForeCastProps) => {
  const { rewards } = data;
  const { min, hour, day, month, week, year } = rewards;
  const orderedRewards: Rewards = {
    min,
    hour,
    day,
    week,
    month,
    year,
  };

  return (
    <View className="flex flex-col mt-2">
      {Object.keys(orderedRewards).map((key) => (
        <RewardColumn key={key} reward={orderedRewards[key]} unit={key} />
      ))}
    </View>
  );
};

export default Forecast;
