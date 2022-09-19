import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { RadialGradient, Defs, Ellipse, Stop } from "react-native-svg";

const { width, height } = Dimensions.get("screen");

type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <SafeAreaView className="flex-1" edges={["right", "top", "left"]}>
      <View className="absolute">
        <Svg
          width={width}
          height={height}
          style={{
            backgroundColor: "#100D12",
          }}
        >
          <Defs>
            <RadialGradient id="a" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#1a1a1a" />
              <Stop offset="100%" stopColor="#020102" />
            </RadialGradient>
          </Defs>
          <Ellipse
            cx="50%"
            cy="0%"
            rx={width}
            ry={height + 200}
            fill="url(#a)"
          />
        </Svg>
      </View>
      <View className="flex-1 mx-8">{children}</View>
    </SafeAreaView>
  );
}
