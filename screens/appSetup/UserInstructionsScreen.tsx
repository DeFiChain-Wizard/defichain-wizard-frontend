import { View, Text } from "react-native";
import React from "react";
import Button from "../../components/Button";
import Title from "../../components/Title";
import Container from "../../components/Container";

const UserInstructionsScreen = ({ navigation }) => {
  return (
    <Container>
      <Title title="Instructions" />

      <View>
        <View>
          <Text className="text-white text-2xl mb-8 text-center">
            Welcome to the Wizard
          </Text>
          <Text className="text-center text-black uppercase font-semibold bg-white py-2">
            Please note following instructions
          </Text>
          <Text className="text-white mt-6 text-base tracking-wide">
            Before you continue with this setup, install the backend first.
          </Text>
          <Text className="text-white mt-4 text-base tracking-wide">
            Keep in mind that the Wizard is still in beta.{"\n"}
            Use only small amounts for testing that you're prepared to lose in
            the worst case.
          </Text>
        </View>
        <View className="flex flex-row justify-end mt-8">
          <Button
            label="Start setup"
            onPress={() => navigation.navigate("Wallet")}
          />
        </View>
      </View>
    </Container>
  );
};

export default UserInstructionsScreen;
