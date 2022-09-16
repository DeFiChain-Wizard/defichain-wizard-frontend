import React from "react";
import { TextInput as RNTextInput } from "react-native";

type TextInputFieldProps = {
  placeholder?: string;
  hasError?: boolean;
  active?: boolean;
  [x: string]: any;
};
const TextInput = ({
  placeholder,
  hasError = false,
  active = true,
  ...rest
}: TextInputFieldProps) => {
  return (
    <RNTextInput
      className={`border-b h-12 px-3 ${
        hasError
          ? "border-[#F06666] text-white"
          : active
          ? "border-b-white text-white"
          : "border-b-white/25 text-white/25"
      }`}
      placeholder={placeholder ? placeholder : null}
      placeholderTextColor={active ? "#838383" : "#4d4d4d"}
      editable={active}
      {...rest}
    />
  );
};

export default TextInput;
