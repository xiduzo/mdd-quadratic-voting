import type { FC } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import type { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { Link } from "expo-router";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { Typography } from "~/_components/Typography";

export const Event: FC<Props> = ({
  endDate,
  tokens,
  maxTokens,
  isActive,
  title,
  description,
  image,
  id,
  extraClass,
  size,
  onPress,
  ...viewProps
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        {...viewProps}
        className={event({ className: extraClass, isActive, size })}
      >
        <View className="flex flex-row items-center justify-between gap-4">
          <View className="rounded-sm bg-white px-2">
            <Typography className="text-slate-900" intent="sm">
              5 days
            </Typography>
          </View>
          <View className="rounded-sm bg-white px-2">
            <Typography className="text-slate-900" intent="sm">
              {tokens}/{maxTokens}
            </Typography>
          </View>
        </View>
        <View className="mt-12 flex-grow justify-center">
          <Typography intent="2xl">{title}</Typography>
          <Typography intent="sm" className="truncate">
            {description}
          </Typography>
        </View>
        <View className="mt-9">
          <Link
            href={`/event/${id}`}
            className="w-full rounded-lg bg-white text-center text-primary"
          >
            <Typography className="text-primary">Vote</Typography>
            {/* <Button title="Vote" intent="action" size="sm" className="w-full" /> */}
          </Link>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

interface Props extends VariantProps<typeof event>, ViewProps {
  endDate: Date;
  id: string;
  tokens: number;
  maxTokens: number;
  title: string;
  description: string;
  image?: string;
  extraClass?: string;
  onPress?: () => void;
}

const event = cva("border-4 rounded-2xl transition-all duration-300", {
  variants: {
    isActive: {
      true: "border-secondary",
      false: "border-slate-900/50",
    },
    size: {
      base: "px-5 py-7",
      sm: "px-3 py-5",
    },
  },
  defaultVariants: {
    isActive: false,
    size: "base",
  },
});
