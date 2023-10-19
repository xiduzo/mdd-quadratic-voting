import { useCallback, useState } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/_components/Button";
import { Navigation } from "~/_components/Navigation";
import { Stepper } from "~/_components/Stepper";
import { api } from "~/utils/api";
import { Step1 } from "./_components/step1";
import { Step2 } from "./_components/step2";
import { Step3 } from "./_components/step3";
import { Step4 } from "./_components/step4";
import { Step5 } from "./_components/step5";

const step1 = z.object({
  imageUri: z.string(),
});

const step2 = z.object({
  title: z.string().min(1),
  description: z.string().min(1).max(280),
});

const step3 = z.object({
  credits: z.number().min(10).max(999),
});

const option = z.object({
  name: z.string().min(1),
  description: z.string().min(1).max(280),
});

const step4 = z.object({
  options: z.array(option).min(2),
});

const step5 = z.object({
  startDate: z.date(),
  endDate: z.date(),
});

const steps = [step1, step2, step3, step4, step5] as const;

const formData = step1.merge(step2).merge(step3).merge(step4).merge(step5);

export type FormData = z.infer<typeof formData>;

const parseStep = (step: z.ZodObject<z.ZodRawShape>, values: unknown) => {
  try {
    step.parse(values);
    return false;
  } catch {
    return true;
  }
};

const CreateEvent = () => {
  const formMethods = useForm<FormData>({
    resolver: zodResolver(formData),
    defaultValues: {
      credits: 100,
    },
  });

  const { mutateAsync } = api.event.create.useMutation({
    onSuccess: () => {
      console.log("success");
    },
  });
  const watch = formMethods.watch();

  const [stepIndex, setStepIndex] = useState(0);

  const changeStep = useCallback(
    (next: number) => () => {
      setStepIndex((prev) => prev + next);
    },
    [],
  );

  const shouldDisableButton = useCallback(() => {
    const step = steps[stepIndex];

    return step ? parseStep(step, watch) : true;
  }, [stepIndex, watch]);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      console.log(data);
      await mutateAsync({
        event: {
          title: data.title,
          description: data.description,
          imageUri: data.imageUri,
          credits: data.credits,
          endDate: new Date(data.endDate).toISOString(),
          startDate: new Date(data.startDate).toISOString(),
        },
        options: data.options,
      });
    },
    [mutateAsync],
  );

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
              onPress={formMethods.handleSubmit(handleSubmit)}
              title="Publish"
              disabled={shouldDisableButton()}
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
