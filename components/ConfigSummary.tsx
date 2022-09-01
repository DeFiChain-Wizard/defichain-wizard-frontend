import { View, Text } from "react-native";
import React from "react";
import Card from "./Card";
import { CustomMessage } from "@defichainwizard/core";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

type ConfigSummaryProps = {
  config: CustomMessage;
  [x: string]: any;
};

const Threshold = ({ threshold, token }) => {
  if (threshold > 0) {
    return (
      <Text className="text-white text-3xl">
        {threshold} {token}
      </Text>
    );
  }
  return <Text className="text-white text-3xl">Disabled</Text>;
};

const ConfigSummary = ({ config, ...rest }: ConfigSummaryProps) => {
  const { rules, poolpairs, compounding } = config;
  return (
    <View className="space-y-12" {...rest}>
      <View className="space-y-1.5">
        <View className="flex flex-row items-center space-x-1.5">
          <MaterialCommunityIcons
            name="arrow-expand-horizontal"
            size={24}
            color="#838383"
          />
          <Text className="text-xs font-semibold text-[#838383] uppercase">
            Risk Ratio
          </Text>
        </View>
        <Text className="text-white text-3xl">
          {rules.keepMinRatio}% - {rules.keepMaxRatio}%
        </Text>
      </View>
      <View className="space-y-1.5">
        <View className="flex flex-row items-center space-x-1.5">
          <MaterialCommunityIcons name="bitcoin" size={24} color="#838383" />
          <Text className="text-xs font-semibold text-[#838383] uppercase">
            Token
          </Text>
        </View>
        <Text className="text-white text-3xl">{Object.keys(poolpairs)[0]}</Text>
      </View>
      <View className="space-y-1.5">
        <View className="flex flex-row items-center space-x-1.5">
          <MaterialCommunityIcons name="infinity" size={24} color="#838383" />
          <Text className="text-xs font-semibold text-[#838383] uppercase">
            Reinvest Threshold
          </Text>
        </View>
        <Threshold
          threshold={compounding.threshold}
          token={compounding.token}
        />
      </View>
    </View>
  );
};

export default ConfigSummary;
