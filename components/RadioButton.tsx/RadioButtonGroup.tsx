import React from "react";
import { View } from "react-native";

export type RadioButtonContextType = {
  value: string;
  onValueChange: (item: string) => void;
};

export const RadioButtonContext = React.createContext<RadioButtonContextType>(
  null as any
);

type RadioButtonGroupProps = {
  children: any;
  value: any;
  onValueChange: any;
};

const RadioButtonGroup = ({
  children,
  value,
  onValueChange,
}: RadioButtonGroupProps) => {
  return (
    <RadioButtonContext.Provider value={{ value, onValueChange }}>
      <View accessibilityRole="radiogroup">{children}</View>
    </RadioButtonContext.Provider>
  );
};

RadioButtonGroup.displayName = "RadioButton.Group";
export default RadioButtonGroup;
