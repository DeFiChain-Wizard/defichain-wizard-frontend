import React from "react";
import { TextInput as RNTextInput } from "react-native";

type TextInputFieldProps = {
  placeholder?: string;
  hasError?: boolean;
  [x: string]: any;
};
const TextInput = ({
  placeholder,
  hasError = false,
  ...rest
}: TextInputFieldProps) => {
  return (
    <RNTextInput
      className={`border-b h-12 px-3 text-white ${hasError ? "border-[#F06666]" : "border-b-white"
        }`}
      placeholder={placeholder ? placeholder : null}
      placeholderTextColor="#838383"
      {...rest}
    />
  );
};

export default TextInput;
