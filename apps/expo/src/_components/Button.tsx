import type { FC } from "react";
import type { ButtonProps } from "react-native";
import { TouchableHighlight, View } from "react-native";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { Icon } from "./Icon";
import type { IconName } from "./Icon";
import { Typography } from "./Typography";

export const Button: FC<Props> = ({
  className,
  startIcon,
  endIcon,
  intent,
  ...buttonProps
}) => {
  return (
    <TouchableHighlight
      {...buttonProps}
      className="rounded-lg"
      underlayColor="transparent"
    >
      <View
        className={button({
          className,
          intent,
          hasIcon: !!startIcon || !!endIcon,
        })}
      >
        {startIcon && <Icon name={startIcon} color="white" />}
        <Typography>{buttonProps.title}</Typography>
        {endIcon && <Icon name={endIcon} color="white" />}
      </View>
    </TouchableHighlight>
  );
};

interface Props extends ButtonProps, VariantProps<typeof button> {
  className?: string;
  startIcon?: IconName;
  endIcon?: IconName;
}

const button = cva("rounded-lg border-2 flex flex-row items-center", {
  variants: {
    intent: {
      primary: "border-white",
      secondary: "border-primary",
      action: "bg-white border-white",
    },
    hasIcon: {
      true: "justify-between",
      false: "justify-center",
    },
    size: {
      base: "py-3 px-4",
      sm: "py-1 px-2",
    },
  },
  defaultVariants: {
    size: "base",
    intent: "primary",
  },
});
