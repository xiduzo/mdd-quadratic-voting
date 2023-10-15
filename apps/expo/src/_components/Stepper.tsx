import { Fragment } from "react";
import type { FC } from "react";
import { View } from "react-native";
import { cva } from "class-variance-authority";

import { Icon } from "./Icon";
import { Typography } from "./Typography";

export const Stepper: FC<Props> = ({ steps, activeStep }) => {
  return (
    <View className="flex flex-row items-center justify-between">
      {steps.map((step, index) => (
        <Fragment key={step}>
          <View
            className={stepStyle({
              isActive: index === activeStep,
              isCompleted: index < activeStep,
            })}
          >
            {index >= activeStep && (
              <Typography
                className={`-mt-0.5 text-[10px] ${
                  index === activeStep ? "text-secondary" : "text-white"
                }`}
              >
                {index + 1}
              </Typography>
            )}
            {index < activeStep && (
              <Icon name="check" className="text-primary" />
            )}
          </View>
          {index < steps.length - 1 && (
            <View
              className={`grow border-b-2 ${
                activeStep > index ? "border-secondary" : "border-white"
              }`}
            />
          )}
        </Fragment>
      ))}
    </View>
  );
};

const stepStyle = cva(
  "flex h-6 w-6 items-center justify-center rounded-full border-2",
  {
    variants: {
      isActive: {
        true: "border-secondary",
        false: "border-white",
      },
      isCompleted: {
        true: "bg-secondary border-secondary",
        false: "",
      },
    },
  },
);

interface Step {
  name: string;
  isActive: boolean;
  isCompleted: boolean;
}

interface Props {
  steps: string[];
  activeStep: number;
}
