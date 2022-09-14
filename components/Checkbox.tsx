import React from "react";
import { View, TouchableOpacity } from "react-native";

type CheckboxItemProps = {
  checked: boolean;
  disabled?: boolean;
  onChange: any;
};
const CheckboxItem = ({
  checked,
  disabled = false,
  onChange,
}: CheckboxItemProps) => {
  return (
    <View className="flex flex-row">
      <TouchableOpacity onPress={() => onChange(!checked)} disabled={disabled}>
        <View
          className={`flex items-center justify-center rounded-md border-2 h-6 w-6 ${
            checked ? "border-white" : "border-white/25"
          }`}
        >
          {checked && <View className="bg-white h-3 w-3 rounded-sm" />}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CheckboxItem;
