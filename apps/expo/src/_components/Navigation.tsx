import type { FC } from "react";
import { View } from "react-native";
import { Link } from "expo-router";
import { cva } from "class-variance-authority";

import type { IconName } from "./Icon";
import { Icon } from "./Icon";
import { Typography } from "./Typography";

const menuItems = [
  { name: "events", icon: "dashboard", href: "/event/" },
  { name: "create", icon: "plus", href: "/event/create" },
  { name: "results", icon: "bar-chart-2", href: "/event/result" },
] as { name: string; icon: IconName; href: string }[];

export const Navigation: FC<Props> = ({ activeItem }) => {
  return (
    <View className="absolute bottom-6 z-50 flex w-full flex-row justify-center px-8">
      <View className="flex grow flex-row justify-around rounded-full bg-black/20 py-2">
        {menuItems.map((item) => (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore-next-line
          <Link key={item.href} href={item.href} replace>
            <View className="flex items-center">
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
          </Link>
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
