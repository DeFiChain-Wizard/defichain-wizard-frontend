import React from "react";
import { View, Modal as RNModal, KeyboardAvoidingView } from "react-native";

type ModalProps = {
  children: React.ReactNode;
  visible: boolean;
};

function Modal({ visible, children }: ModalProps) {
  return (
    <RNModal animationType="slide" transparent={true} visible={visible}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View className="flex-1 justify-end">
          <View className="m-5 bg-[#000000] border-2 border-white rounded-3xl p-4 space-y-8">
            {children}
          </View>
        </View>
      </KeyboardAvoidingView>
    </RNModal>
  );
}

export default Modal;
