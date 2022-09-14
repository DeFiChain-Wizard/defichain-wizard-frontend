import { Text } from "react-native";

type ModeDescriptionProps = {
  text: string;
  checked: boolean;
  [x: string]: any;
};

const ModeDescription = ({ text, checked, ...rest }: ModeDescriptionProps) => {
  return (
    <Text
      className={`text-2xl ${checked ? "text-white" : "text-white/25"}`}
      {...rest}
    >
      {text}
    </Text>
  );
};

export default ModeDescription;
