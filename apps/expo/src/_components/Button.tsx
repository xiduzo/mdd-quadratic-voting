import type { FC } from "react";
import type { ButtonProps, TouchableHighlightProps } from "react-native";
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
  size,
  disabled,
  ...buttonProps
}) => {
  return (
    <TouchableHighlight
      {...buttonProps}
      disabled={!!disabled}
      className="rounded-lg"
      underlayColor="transparent"
    >
      <View
        className={button({
          className,
          disabled,
          intent,
          hasIcon: !!startIcon || !!endIcon,
          size,
        })}
      >
        {startIcon && (
          <Icon
            name={startIcon}
            color={intent === "action" ? "black" : "white"}
          />
        )}
        <Typography className={intent === "action" ? "text-black" : ""}>
          {buttonProps.title}
        </Typography>
        {endIcon && (
          <Icon
            name={endIcon}
            color={intent === "action" ? "black" : "white"}
          />
        )}
      </View>
    </TouchableHighlight>
  );
};

export const IconButton: FC<IconButtonProps> = ({
  icon,
  ...touchableHighlightProps
}) => {
  return (
    <TouchableHighlight {...touchableHighlightProps} underlayColor="#F6AE2D">
      <Icon name={icon} size={32} color="white" />
    </TouchableHighlight>
  );
};

interface IconButtonProps extends TouchableHighlightProps {
  icon: IconName;
}

interface Props
  extends Omit<ButtonProps, "disabled">,
    VariantProps<typeof button> {
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
      sm: "px-1",
    },
    disabled: {
      true: "opacity-50",
    },
  },
  defaultVariants: {
    size: "base",
    intent: "primary",
  },
});
