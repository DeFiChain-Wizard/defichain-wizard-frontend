import { View, Text, ScrollView } from "react-native";
import React, { useCallback, useState } from "react";
import { deleteItem, getAddress, getConfig } from "../utils/securestore";
import Title from "../components/Title";
import Button from "../components/Button";
import { CustomMessage } from "../types/CustomMessage";
import { useFocusEffect } from "@react-navigation/native";
import Container from "../components/Container";

const InfoScreen = ({ navigation }) => {
  const [config, setConfig] = useState<CustomMessage>(null);
  const [address, setAddress] = useState<any>(null);

  const loadConfig = useCallback(() => {
    getConfig().then((config) => {
      setConfig(config);
    });

    getAddress().then((vault) => {
      setAddress(vault);
    });
  }, []);

  useFocusEffect(loadConfig);

  const onDeleteHandler = () => {
    deleteItem("config");
    deleteItem("vault");
    deleteItem("isSetUp");
    deleteItem("isInitialized");
    deleteItem("address").then(navigation.navigate("Home"));
  };

  return (
    <Container>
      <Title title="Info" />
      <View className="space-y-4 flex-1">
        <Text className="text-white text-sm text-center">
          <Text className="font-semibold">
            This page is for development only.
          </Text>
        </Text>
        <ScrollView className="space-y-4">
          <Text
            className={`text-[#838383] text-md ${
              !config ? "text-center" : "text-start"
            }`}
          >
            {config
              ? JSON.stringify({ customTransaction: config }, null, 2)
              : "No config in storage"}
          </Text>
          <Text
            className={`text-[#838383] text-md ${
              !address ? "text-center" : "text-start"
            }`}
          >
            {address
              ? JSON.stringify({ address: address }, null, 2)
              : "No address in storage"}
          </Text>
        </ScrollView>
        <View className="flex-1 items-center justify-end mb-40">
          <Button
            className="self-center"
            label="Clear app"
            onPress={() => {
              onDeleteHandler();
            }}
          />
        </View>
      </View>
    </Container>
  );
};

export default InfoScreen;
