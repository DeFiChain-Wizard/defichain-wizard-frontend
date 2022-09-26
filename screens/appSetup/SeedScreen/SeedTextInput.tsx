import React from "react";
import { View, Text } from "react-native";
import TextInput from "../../../components/TextInput";

type SeedTextInputProps = {
  defaultValue: any;
  wordIndex: any;
  hasError?: boolean;
  onChangeText: (text: string, index: number) => void;
};

const SeedTextInput = ({
  defaultValue,
  wordIndex,
  hasError,
  onChangeText,
}: SeedTextInputProps) => {
  return (
    <View
      className="flex flex-row w-[50%] py-0.5 justify-center items-center"
      key={wordIndex}
    >
      <Text className="w-8 pr-2.5 text-right text-[#838383]">
        {wordIndex + 1}.
      </Text>
      <TextInput
        className="flex-1  mb-1.5 rounded-md p-3 text-white"
        placeholder={`Enter word #${wordIndex + 1}`}
        autoCapitalize="none"
        autoCorrect={false}
        contextMenuHidden={true}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        hasError={hasError}
      />
    </View>
  );
};

export default SeedTextInput;
