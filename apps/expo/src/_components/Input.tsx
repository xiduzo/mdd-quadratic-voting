import type { FC } from "react";
import type { TextInputProps } from "react-native";
import { TextInput } from "react-native";
import { Controller, useFormContext } from "react-hook-form";

export const Input: FC<Props> = ({ name, ...textInputProps }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextInput
          {...textInputProps}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          className="rounded-lg border border-dashed px-7 py-3 text-white"
        />
      )}
    />
  );
};

interface Props extends TextInputProps {
  name: string;
}
