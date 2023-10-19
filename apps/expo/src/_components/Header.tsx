import type { FC } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import type { NativeStackHeaderProps } from "@react-navigation/native-stack";

import { Icon } from "./Icon";
import { V } from "./svgs/V";
// import { IconButton } from "./button";
import { Typography } from "./Typography";

export const Header: FC<NativeStackHeaderProps> = (props) => {
  const { back } = useRouter();
  const safeArea = useSafeAreaInsets();

  console.log("header", props.back, props.options.headerBackVisible);
  return (
    <View
      className="flex-row items-center justify-between bg-primary px-6 pb-2"
      style={{
        paddingTop: safeArea.top,
      }}
    >
      <View className="absolute -right-40 -top-40 h-80 w-80 border-spacing-4 rounded-full border border-dashed border-secondary" />

      <View>
        {props.back && props.options.headerBackVisible && (
          <Icon
            size={24}
            name="chevron-left"
            className="mr-2"
            // title={props.options.headerBackTitle ?? "Go back"}
            onPress={back}
          />
        )}
        {props.options.headerLeft?.({ canGoBack: true })}
      </View>
      <View className="flex-grow">
        {props.options.title && (
          <View className="flex flex-row space-x-2">
            <V />
            <Typography>{props.options.title}</Typography>
          </View>
        )}
      </View>
      <View>{props.options.headerRight?.({ canGoBack: false })}</View>
    </View>
  );
};
