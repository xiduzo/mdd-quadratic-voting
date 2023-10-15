import { View } from "react-native";
import { useFormContext } from "react-hook-form";

import { Input } from "~/_components/Input";
import { Typography } from "~/_components/Typography";
import type { FormData } from "../index";

export const Step2 = () => {
  const { watch } = useFormContext<FormData>();

  const description = watch("description");

  return (
    <View className="mt-8 grow">
      <Typography intent="4xl">Information</Typography>
      <View className="mt-8 space-y-4">
        <Input name="title" placeholder="Create a short title" />
        <View>
          <Input
            className="min-h-[160px]"
            multiline
            name="description"
            numberOfLines={4}
            placeholder="Write a short description"
            maxLength={280}
          />
          <Typography
            dimmed
            className="absolute bottom-2 right-4 text-right"
            intent="sm"
          >
            {description.length}/280
          </Typography>
        </View>
      </View>
    </View>
  );
};
