import { Text } from "react-native";

type RewardItemProps = {
  value: string;
  symbol: "DFI" | "$";
  position?: "left" | "right";
};

const RewardItem = ({ value, symbol, position = "left" }: RewardItemProps) => {
  return (
    <Text
      className="text-[#838383] text-lg"
      style={{ fontVariant: ["tabular-nums"] }}
    >
      {position === "left" && symbol}{" "}
      <Text className="text-white">{value}</Text>{" "}
      {position === "right" && symbol}
    </Text>
  );
};

export default RewardItem;
