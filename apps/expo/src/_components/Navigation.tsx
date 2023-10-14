import type { FC } from "react";
import { View } from "react-native";
import { cva } from "class-variance-authority";

import type { IconName } from "./Icon";
import { Icon } from "./Icon";
import { Typography } from "./Typography";

const menuItems = [
  { name: "events", icon: "dashboard" },
  { name: "create", icon: "times" },
  { name: "results", icon: "bar-chart-2" },
] as { name: string; icon: IconName }[];

export const Navigation: FC<Props> = ({ activeItem }) => {
  return (
    <View className="absolute bottom-0 flex w-full flex-row justify-center">
      <View className="flex max-w-xs grow flex-row justify-around rounded-full bg-black/20 py-2">
        {menuItems.map((item) => (
          <View key={item.name} className="flex items-center">
            <Icon
              name={item.icon}
              size={32}
              className={textColor({ isActive: activeItem === item.name })}
            />
            <Typography
              className={textColor({
                isActive: activeItem === item.name,
                className: "text-[8px] font-medium capitalize leading-[12px]",
              })}
            >
              {item.name}
            </Typography>
          </View>
        ))}
      </View>
    </View>
  );
};

interface Props {
  activeItem: "events" | "create" | "results";
}

const textColor = cva("", {
  variants: {
    isActive: {
      true: "text-action",
      false: "text-white",
    },
  },
});
