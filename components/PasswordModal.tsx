import { View, Text } from "react-native";
import React from "react";
import Button from "./Button";
import TextInput from "./TextInput";
import Modal from "./Modal";

type PasswordModalProps = {
  visible: boolean;
  onCancel: any;
  onConfirm: any;
  onChangePassword: any;
  showCancelButton?: boolean;
  description?: string;
};

const PasswordModal = ({
  visible,
  onCancel,
  onConfirm,
  onChangePassword,
  showCancelButton = true,
  description = "This action needs your confirmation!",
}: PasswordModalProps) => {
  return (
    <Modal visible={visible}>
      {!!description && (
        <View className="items-center">
          <Text className="text-white self-centeer text-lg font-semibold">
            {description}
          </Text>
        </View>
      )}
      <TextInput
        className="mt-4 mb-8"
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={onChangePassword}
      />
      <View
        className={`flex flex-row ${
          showCancelButton ? "justify-between" : "justify-end"
        }`}
      >
        {showCancelButton && (
          <Button
            label="Cancel"
            type="secondary"
            onPress={() => onCancel(!visible)}
          />
        )}
        <Button label="Confirm" onPress={onConfirm} />
      </View>
    </Modal>
  );
};

export default PasswordModal;
