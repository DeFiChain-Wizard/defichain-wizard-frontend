import React from "react";
import { View, Modal as RNModal, KeyboardAvoidingView } from "react-native";

type ModalProps = {
  children: React.ReactNode;
  visible: boolean;
};

function Modal({ visible, children }: ModalProps) {
  return (
    <RNModal animationType="fade" transparent={true} visible={visible}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View className="flex-1 justify-end bg-black/90">
          <View className="bg-black px-8 pb-16">{children}</View>
        </View>
      </KeyboardAvoidingView>
    </RNModal>
  );
}

export default Modal;
