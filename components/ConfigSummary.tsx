import { View, Text } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CustomMessage } from "../types/CustomMessage";

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
  const { mode } = compounding;
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
            Collateral Ratio
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
            Minted token
          </Text>
        </View>
        <Text className="text-white text-3xl">{Object.keys(poolpairs)[0]}</Text>
      </View>
      <View className="space-y-1.5">
        <View className="flex flex-row items-center space-x-1.5">
          <MaterialCommunityIcons name="infinity" size={24} color="#838383" />
          <Text className="text-xs font-semibold text-[#838383] uppercase">
            Compounding
          </Text>
        </View>

        <View>
          {mode === 0 && <Text className="text-white text-2xl">Disabled</Text>}
          {mode === 1 && (
            <Text className="text-white text-2xl">
              Every {compounding.threshold} DFI will added as collateral to
              vault.
            </Text>
          )}
          {mode === 2 && (
            <Text className="text-white text-2xl">
              Every {compounding.threshold} {compounding.token} will swapped
              into {compounding.token}.
            </Text>
          )}
          {mode === 3 && (
            <Text className="text-white text-2xl">
              Every {compounding.threshold} {compounding.token} will swapped
              into {compounding.token} and added to vault.
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default ConfigSummary;
