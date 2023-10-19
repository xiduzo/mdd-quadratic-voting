import type { FC } from "react";
import { Fragment } from "react";
import type { TouchableHighlightProps } from "react-native";
import { TouchableOpacity } from "react-native";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { EggSmall } from "~/_components";
import { Icon } from "~/_components/Icon";

export const EggButton: FC<Props> = ({
  icon,
  disabled,
  className,
  ...touchableHighlightProps
}) => {
  return (
    <TouchableOpacity
      disabled={!!disabled}
      className={eggButton({ disabled, className })}
      {...touchableHighlightProps}
    >
      <Fragment>
        <EggSmall className="absolute -translate-x-1 -translate-y-3 shadow-md shadow-slate-900" />
        <Icon name={icon} className="z-10" size={32} />
      </Fragment>
    </TouchableOpacity>
  );
};

interface Props
  extends Omit<TouchableHighlightProps, "disabled">,
    VariantProps<typeof eggButton> {
  icon: "minus" | "plus";
}

const eggButton = cva("", {
  variants: {
    disabled: {
      true: "opacity-40",
      false: "",
    },
  },
  defaultVariants: {
    disabled: false,
  },
});
