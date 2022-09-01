import React, { useCallback, useState } from "react";
import Title from "../../components/Title";
import { Text, TouchableOpacity, View } from "react-native";
import Container from "../../components/Container";
import { getConfig } from "../../utils/securestore";
import { CustomMessage } from "@defichainwizard/core";
import Button from "../../components/Button";
import ConfigSummary from "../../components/ConfigSummary";
import { useFocusEffect } from "@react-navigation/native";

const SettingsScreen = ({ navigation }) => {
  const [config, setConfig] = useState<CustomMessage>(null);

  const loadConfig = useCallback(() => {
    getConfig().then((config) => {
      setConfig(config);
    });
  }, []);

  useFocusEffect(loadConfig);

  return (
    <Container>
      <Title title="Settings" />
      {/* risk ratio */}
      {config && <ConfigSummary config={config} />}
      <View className="flex-1 justify-center items-center mt-4">
        {!config && (
          <View className="flex-1 items-center justify-end mb-40 space-y-4">
            <Text className="text-[#838383]">You have not set up your bot</Text>
            <Button
              label="Setup bot"
              onPress={() => navigation.navigate("RiskRatio")}
            />
          </View>
        )}
        {config && (
          <View className="flex-1 items-center justify-end mb-40 space-y-4">
            <TouchableOpacity
              className="flex justify-center border-2 border-white px-5 py-3 rounded-full"
              onPress={() => navigation.navigate("RiskRatio")}
            >
              <Text className="text-white text-xs font-semibold">
                Change settings
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Container>
  );
};

export default SettingsScreen;
