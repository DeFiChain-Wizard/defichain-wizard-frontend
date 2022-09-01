import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Modal from "./Modal";

type LoadingIndicatorProps = {
  text?: string;
};

const LoadingIndicator = ({
  text = "Send config...",
}: LoadingIndicatorProps) => {
  return (
    <Modal visible={true}>
      <View className="items-center justify-center space-y-3 ">
        <ActivityIndicator size="large" animating={true} color="white" />
        <Text className="text-white ">{text}</Text>
      </View>
    </Modal>
  );
};

export default LoadingIndicator;
