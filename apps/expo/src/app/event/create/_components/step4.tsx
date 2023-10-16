import { useCallback } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Icon } from "~/_components/Icon";
import { Input } from "~/_components/Input";
import { Typography } from "~/_components/Typography";
import type { FormData } from "../index";

export const Step4 = () => {
  const { control } = useFormContext<FormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const addOption = useCallback(
    () => append({ name: "", description: "" }),
    [append],
  );

  const deleteOption = useCallback(
    (index: number) => () => remove(index),
    [remove],
  );

  return (
    <View className="mt-8 grow">
      <Typography intent="4xl" className="mb-9">
        Options
      </Typography>
      <ScrollView className="-mx-8 mb-6 max-h-[45vh] px-8">
        {fields.map((field, index) => (
          <View key={field.id} className="mb-6 space-y-2">
            <View className="flex-row items-center justify-between">
              <Typography>Option {index + 1}</Typography>
              <Typography
                onPress={deleteOption(index)}
                intent="xl"
                className="text-[16px] text-error"
              >
                Delete
              </Typography>
            </View>
            <Input name={`options.${index}.name`} placeholder="name" />
            <Input
              name={`options.${index}.description`}
              placeholder="description"
              multiline
            />
          </View>
        ))}
      </ScrollView>
      <View className="flex flex-row justify-end">
        <TouchableOpacity onPress={addOption}>
          <View className="flex-row items-center space-x-2">
            <Icon name="plus" className="opacity-40" />
            <Typography dimmed>Add option</Typography>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
