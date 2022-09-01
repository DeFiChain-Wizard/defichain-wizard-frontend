import React from "react";
import { Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
const { width } = Dimensions.get("screen");

type ChartBackgroundProps = {
  color?: string;
};

const ChartBackground = ({ color = "white" }: ChartBackgroundProps) => {
  return (
    <Svg width={width - 60} height={128}>
      <Path
        d="M0 128h10.959V69.012q0-4-4-4H4q-4 0-4 4ZM13.699 128h10.959V27.525q0-4-4-4h-2.96q-4 0-4 4ZM27.397 128h10.96V53.265q0-4-4-4h-2.96q-4 0-4 4ZM41.096 128h10.959V87.326q0-4-4-4h-2.96q-4 0-4 4ZM54.795 128h10.958V46.892q0-4-4-4h-2.958q-4 0-4 4ZM68.493 128h10.96V74.802q0-4-4-4h-2.96q-4 0-4 4ZM82.192 128H93.15V91.425q0-4-4-4h-2.96q-4 0-4 4ZM95.89 128h10.96V80.318q0-4-4-4h-2.96q-4 0-4 4ZM109.589 128h10.959V59.861q0-4-4-4h-2.959q-4 0-4 4ZM123.288 128h10.959V63.556q0-4-4-4h-2.96q-4 0-4 4ZM136.986 128h10.96V75.642q0-4-4-4h-2.96q-4 0-4 4ZM150.685 128h10.959V51.67q0-4-4-4h-2.96q-4 0-4 4ZM164.384 128h10.958V23.225q0-4-4-4h-2.958q-4 0-4 4ZM178.082 128h10.96V33.766q0-4-4-4h-2.96q-4 0-4 4ZM191.78 128h10.96V76.058q0-4-4-4h-2.96q-4 0-4 4ZM205.48 128h10.958v-24.481q0-4-4-4h-2.959q-4 0-4 4ZM219.178 128h10.959V77.75q0-4-4-4h-2.959q-4 0-4 4ZM232.877 128h10.959V83.802q0-4-4-4h-2.96q-4 0-4 4ZM246.575 128h10.96V57.608q0-4-4-4h-2.96q-4 0-4 4ZM260.274 128h10.959V89.99q0-4-4-4h-2.959q-4 0-4 4ZM273.973 128h10.959V21.53q0-4-4-4h-2.96q-4 0-4 4ZM287.671 128h10.96V59.66q0-4-4-4h-2.96q-4 0-4 4ZM301.37 128h10.959V60.061q0-4-4-4h-2.96q-4 0-4 4ZM315.068 128h10.96V45.461q0-4-4-4h-2.96q-4 0-4 4ZM328.767 128h10.959V61.405q0-4-4-4h-2.959q-4 0-4 4ZM342.466 128h10.959V65.418q0-4-4-4h-2.96q-4 0-4 4ZM356.164 128h10.96V62.455q0-4-4-4h-2.96q-4 0-4 4ZM369.863 128h10.959V26.158q0-4-4-4h-2.959q-4 0-4 4ZM383.562 128h10.959V29.048q0-4-4-4h-2.96q-4 0-4 4ZM397.26 128h10.96V88.501q0-4-4-4h-2.96q-4 0-4 4ZM410.959 128h10.959V28.83q0-4-4-4h-2.96q-4 0-4 4ZM424.658 128h10.958V32.527q0-4-4-4h-2.958q-4 0-4 4ZM438.356 128h10.96V49.594q0-4-4-4h-2.96q-4 0-4 4ZM452.055 128h10.959V79.865q0-4-4-4h-2.96q-4 0-4 4ZM465.753 128h10.96V73.758q0-4-4-4h-2.96q-4 0-4 4ZM479.452 128h10.959V57.11q0-4-4-4h-2.959q-4 0-4 4ZM493.15 128h10.96V45.055q0-4-4-4h-2.96q-4 0-4 4ZM506.85 128h10.958V17.325q0-4-4-4h-2.959q-4 0-4 4ZM520.548 128h10.959V64.912q0-4-4-4h-2.96q-4 0-4 4ZM534.247 128h10.958V25.07q0-4-4-4h-2.958q-4 0-4 4ZM547.945 128h10.96V31.337q0-4-4-4h-2.96q-4 0-4 4ZM561.644 128h10.959V35.295q0-4-4-4h-2.96q-4 0-4 4ZM575.342 128h10.96v-27.834q0-4-4-4h-2.96q-4 0-4 4ZM589.041 128H600V73.063q0-4-4-4h-2.959q-4 0-4 4ZM602.74 128h10.959V32.002q0-4-4-4h-2.96q-4 0-4 4ZM616.438 128h10.96V99.33q0-4-4-4h-2.96q-4 0-4 4ZM630.137 128h10.959V43.022q0-4-4-4h-2.959q-4 0-4 4ZM643.836 128h10.959V24.1q0-4-4-4h-2.96q-4 0-4 4ZM657.534 128h10.96V71.672q0-4-4-4h-2.96q-4 0-4 4ZM671.233 128h10.959V89.177q0-4-4-4h-2.96q-4 0-4 4ZM684.932 128h10.958V31.256q0-4-4-4h-2.958q-4 0-4 4ZM698.63 128h10.959V98.575q0-4-4-4h-2.959q-4 0-4 4ZM712.329 128h10.959V77.586q0-4-4-4h-2.96q-4 0-4 4ZM726.027 128h10.96V54.336q0-4-4-4h-2.96q-4 0-4 4ZM739.726 128h10.959V43.102q0-4-4-4h-2.959q-4 0-4 4ZM753.425 128h10.959V77.202q0-4-4-4h-2.96q-4 0-4 4ZM767.123 128h10.96V52.1q0-4-4-4h-2.96q-4 0-4 4ZM780.822 128h10.959V30.087q0-4-4-4h-2.96q-4 0-4 4ZM794.52 128h10.96v-25.478q0-4-4-4h-2.96q-4 0-4 4ZM808.22 128h10.958V98.892q0-4-4-4h-2.959q-4 0-4 4ZM821.918 128h10.959V50.769q0-4-4-4h-2.96q-4 0-4 4ZM835.616 128h10.96V64.802q0-4-4-4h-2.96q-4 0-4 4ZM849.315 128h10.959V65.573q0-4-4-4h-2.959q-4 0-4 4ZM863.014 128h10.959V40.987q0-4-4-4h-2.96q-4 0-4 4ZM876.712 128h10.96V98.748q0-4-4-4h-2.96q-4 0-4 4ZM890.411 128h10.959V39.466q0-4-4-4h-2.959q-4 0-4 4ZM904.11 128h10.958V59.623q0-4-4-4h-2.958q-4 0-4 4ZM917.808 128h10.96V17.59q0-4-4-4h-2.96q-4 0-4 4ZM931.507 128h10.959V51.664q0-4-4-4h-2.96q-4 0-4 4ZM945.205 128h10.96V69.553q0-4-4-4h-2.96q-4 0-4 4ZM958.904 128h10.959V49.734q0-4-4-4h-2.959q-4 0-4 4ZM972.603 128h10.959V91.745q0-4-4-4h-2.96q-4 0-4 4ZM986.301 128h10.96v-26.495q0-4-4-4h-2.96q-4 0-4 4Z"
        fill={color}
      />
    </Svg>
  );
};

export default ChartBackground;
