import { View } from "react-native";
import React from "react";
import Button from "./Button";
import TextInput from "./TextInput";
import Modal from "./Modal";

type PasswordModalProps = {
  visible: boolean;
  onCancel: any;
  onConfirm: any;
  onChangePassword: any;
};

const PasswordModal = ({
  visible,
  onCancel,
  onConfirm,
  onChangePassword,
}: PasswordModalProps) => {
  return (
    <Modal visible={visible}>
      <TextInput
        className=""
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={onChangePassword}
      />
      <View className="flex flex-row justify-between">
        <Button
          label="Cancel"
          type="secondary"
          onPress={() => onCancel(!visible)}
        />
        <Button label="Confirm" onPress={onConfirm} />
      </View>
    </Modal>
  );
};

export default PasswordModal;
