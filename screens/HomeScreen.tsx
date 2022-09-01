import { View, Image, Text } from "react-native";
import React, { useCallback, useState } from "react";
import logo from "../assets/wizard-logo-text.png";
import Button from "../components/Button";
import { getItem } from "../utils/securestore";
import Container from "../components/Container";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const loadConfig = useCallback(() => {
    getItem("isInitialized").then((isInitialized) =>
      setIsInitialized(Boolean(isInitialized))
    );
  }, []);

  useFocusEffect(loadConfig);

  return (
    <Container>
      <View className="flex-1 justify-center items-center">
        <View className="flex space-y-8">
          <Image className="w-[200px] h-[260px]" source={logo} />
          <View className="flex items-center">
            {!isInitialized && (
              <Button
                label="Set up your wallet"
                className="mt-4"
                onPress={() => {
                  navigation.navigate("Wallet");
                }}
              />
            )}
            {isInitialized && (
              <View className="flex space-y-2 items-center mt-5">
                <Text className="text-[#838383] text-xs"></Text>
                <Button
                  label="Go to Dashboard"
                  className="mt-4"
                  type="primary"
                  onPress={() => {
                    navigation.navigate("Internal");
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </Container>
  );
}
