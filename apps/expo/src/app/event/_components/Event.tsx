import { useMemo } from "react";
import type { FC } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import type { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { useRouter } from "expo-router";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { Button } from "~/_components/Button";
import { Typography } from "~/_components/Typography";
import { api } from "~/utils/api";

export const Event: FC<Props> = ({
  endDate,
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
  const { push } = useRouter();
  const { data } = api.vote.byEventId.useQuery(id);

  const myCredits = useMemo(() => {
    return data?.options.reduce((acc, curr) => {
      return (
        acc + curr.votes.reduce((_acc, _curr) => _acc + (_curr.credits ?? 0), 0)
      );
    }, 0);
  }, [data]);
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
              {myCredits}/{maxTokens}
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
          <Button
            title="Vote"
            intent="action"
            size="sm"
            className="w-full"
            onPress={() => push(`/event/${id}`)}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

interface Props extends VariantProps<typeof event>, ViewProps {
  endDate: Date;
  id: string;
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
