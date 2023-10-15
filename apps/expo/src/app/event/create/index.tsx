import { useCallback, useState } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/_components/Button";
import { Navigation } from "~/_components/Navigation";
import { Stepper } from "~/_components/Stepper";
import { Step1 } from "./_components/step1";
import { Step2 } from "./_components/step2";
import { Step3 } from "./_components/step3";
import { Step4 } from "./_components/step4";
import { Step5 } from "./_components/step5";

const formData = z.object({
  imageUri: z.string(),
  title: z.string(),
  description: z.string(),
});

export type FormData = z.infer<typeof formData>;

const CreateEvent = () => {
  const formMethods = useForm<FormData>();
  const { getValues } = formMethods;
  formMethods.watch(); // Force re-renders in a poor mans way

  const [stepIndex, setStepIndex] = useState(0);

  const changeStep = useCallback(
    (next: number) => () => {
      setStepIndex((prev) => prev + next);
    },
    [],
  );

  const shouldDisableButton = useCallback(() => {
    if (stepIndex === 0) {
      const imageUri = getValues("imageUri");
      if (imageUri) return false;
    }

    return true;
  }, [stepIndex, getValues]);

  return (
    <View className="bg-primary">
      <Stack.Screen options={{ title: "Create", animation: "none" }} />
      <Navigation activeItem="create" />
      <View className="flex h-full w-full justify-between px-8 pb-28  pt-14">
        <Stepper
          steps={["file upload", "information", "credits", "options", "dates"]}
          activeStep={stepIndex}
        />
        <FormProvider {...formMethods}>
          {stepIndex === 0 && <Step1 />}
          {stepIndex === 1 && <Step2 />}
          {stepIndex === 2 && <Step3 />}
          {stepIndex === 3 && <Step4 />}
          {stepIndex === 4 && <Step5 />}
        </FormProvider>
        <View className="flex flex-row space-x-4">
          <Button
            className="grow"
            title="back"
            startIcon="chevron-left"
            disabled={stepIndex === 0}
            onPress={changeStep(-1)}
          />
          {stepIndex <= 3 && (
            <Button
              title="next"
              className="grow"
              intent="action"
              disabled={shouldDisableButton()}
              endIcon="chevron-right"
              onPress={changeStep(1)}
            />
          )}
          {stepIndex > 3 && (
            <Button
              title="Publish"
              className="grow"
              intent="action"
              endIcon="chevron-right"
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default CreateEvent;
