import { Fragment } from "react";
import type { FC } from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

import { EggSmall } from "~/_components";

export const EggBasket: FC<Props> = ({ filledPercentage }) => {
  return (
    <View className="items-center">
      <View className="translate-y-14 flex-row space-x-2">
        <EggSmall
          className={filledPercentage >= 80 ? "opacity-60" : "opacity-0"}
        />
        <EggSmall
          className={filledPercentage >= 100 ? "opacity-60" : "opacity-0"}
        />
      </View>
      <View className="translate-y-5 flex-row space-x-2">
        <View className={filledPercentage >= 20 ? "opacity-100" : "opacity-0"}>
          <EggWithEyes />
        </View>
        <View className={filledPercentage >= 40 ? "opacity-100" : "opacity-0"}>
          <EggWithEyes />
        </View>
        <View className={filledPercentage >= 60 ? "opacity-100" : "opacity-0"}>
          <EggWithEyes />
        </View>
      </View>
      <View className="h-6 w-48 rounded-full border-4 border-white bg-primary"></View>
      <View className="h-12 w-40 rounded-b-full border-4 border-t-0 border-white bg-primary"></View>
    </View>
  );
};

const EggWithEyes = () => {
  return (
    <Fragment>
      <View className="absolute left-2 top-4 z-10">
        <Svg width={9} height={4}>
          <Path
            d="M7.97862 3.48092C8.32782 3.233 8.4064 2.75487 8.15322 2.41841C6.98338 0.82463 5.68258 0.0365967 4.29449 0.0808682C2.07702 0.142848 0.619087 2.35643 0.557976 2.45382C0.330991 2.808 0.435753 3.27728 0.80242 3.50749C1.16909 3.72885 1.64925 3.63145 1.87623 3.27728C1.88496 3.25957 2.95877 1.64808 4.33814 1.61266C5.17623 1.61266 6.02306 2.16163 6.87862 3.31269C7.02703 3.51634 7.27147 3.63145 7.51592 3.63145C7.68179 3.62259 7.83893 3.57832 7.97862 3.48092Z"
            fill="white"
          />
        </Svg>
      </View>
      <View className="absolute left-5 top-4 z-10">
        <Svg width={9} height={4}>
          <Path
            d="M7.97862 3.48092C8.32782 3.233 8.4064 2.75487 8.15322 2.41841C6.98338 0.82463 5.68258 0.0365967 4.29449 0.0808682C2.07702 0.142848 0.619087 2.35643 0.557976 2.45382C0.330991 2.808 0.435753 3.27728 0.80242 3.50749C1.16909 3.72885 1.64925 3.63145 1.87623 3.27728C1.88496 3.25957 2.95877 1.64808 4.33814 1.61266C5.17623 1.61266 6.02306 2.16163 6.87862 3.31269C7.02703 3.51634 7.27147 3.63145 7.51592 3.63145C7.68179 3.62259 7.83893 3.57832 7.97862 3.48092Z"
            fill="white"
          />
        </Svg>
      </View>
      <View className="absolute left-3.5 top-6 z-10 rotate-180">
        <Svg width={9} height={4}>
          <Path
            d="M7.97862 3.48092C8.32782 3.233 8.4064 2.75487 8.15322 2.41841C6.98338 0.82463 5.68258 0.0365967 4.29449 0.0808682C2.07702 0.142848 0.619087 2.35643 0.557976 2.45382C0.330991 2.808 0.435753 3.27728 0.80242 3.50749C1.16909 3.72885 1.64925 3.63145 1.87623 3.27728C1.88496 3.25957 2.95877 1.64808 4.33814 1.61266C5.17623 1.61266 6.02306 2.16163 6.87862 3.31269C7.02703 3.51634 7.27147 3.63145 7.51592 3.63145C7.68179 3.62259 7.83893 3.57832 7.97862 3.48092Z"
            fill="white"
          />
        </Svg>
      </View>
      <EggSmall />
    </Fragment>
  );
};

interface Props {
  filledPercentage: number;
}
