import type { FC } from "react";
import { View } from "react-native";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { Button } from "~/_components/Button";
import { Typography } from "~/_components/Typography";

export const Event: FC<Props> = ({
  endDate,
  tokens,
  maxTokens,
  isActive,
  title,
  description,
  image,
  extraClass,
  size,
}) => {
  return (
    <View className={event({ className: extraClass, isActive, size })}>
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
      <View className="mt-12">
        <Typography intent="2xl">{title}</Typography>
        <Typography intent="sm">{description}</Typography>
      </View>
      <View className="mt-9">
        <Button title="Vote" intent="action" size="sm" />
      </View>
    </View>
  );
};

interface Props extends VariantProps<typeof event> {
  endDate: Date;
  tokens: number;
  maxTokens: number;
  title: string;
  description: string;
  image?: string;
  extraClass?: string;
}

const event = cva("border-4 rounded-2xl", {
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
