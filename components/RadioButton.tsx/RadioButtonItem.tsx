import React from "react";
import { View, TouchableOpacity } from "react-native";
import { RadioButtonContext, RadioButtonContextType } from "./RadioButtonGroup";
import { isChecked } from "./utils";

type RadioButtonItemProps = {
  value: string;
};
const RadioButtonItem = ({ value }: RadioButtonItemProps) => {
  return (
    <RadioButtonContext.Consumer>
      {(context?: RadioButtonContextType) => {
        const checked =
          isChecked({
            contextValue: context?.value,
            value,
          }) === "checked";
        return (
          <View className="flex flex-row">
            <TouchableOpacity onPress={() => context.onValueChange(value)}>
              <View
                className={`flex items-center justify-center rounded-full border-2 h-6 w-6 ${
                  checked ? "border-white" : "border-white/25"
                }`}
              >
                {checked && <View className="bg-white h-3 w-3 rounded-full" />}
              </View>
            </TouchableOpacity>
          </View>
        );
      }}
    </RadioButtonContext.Consumer>
  );
};

RadioButtonItem.displayName = "RadioButton.Item";
export default RadioButtonItem;
