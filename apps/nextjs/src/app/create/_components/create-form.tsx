"use client";

import { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "~/utils/api";

export const runtime = "edge";

export const CreateForm = () => {
  const { mutateAsync } = api.event.create.useMutation();

  const formMethods = useForm<FormProps>({
    resolver: zodResolver(schema),
    shouldUnregister: true,
  });

  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: "options",
  });

  const onValid = useCallback(
    async (data: FormProps) => {
      await mutateAsync(data, {
        onSuccess: () => {
          formMethods.reset();
        },
      });
    },
    [mutateAsync, formMethods],
  );

  const addOption = useCallback(
    () => append({ name: "", description: "" }),
    [append],
  );

  const deleteOption = useCallback(
    (index: number) => () => remove(index),
    [remove],
  );

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onValid, console.error)}>
        <fieldset className="flex flex-col space-y-4">
          <legend>event</legend>
          <div>
            <label>credits</label>
            <input
              {...formMethods.register("event.credits", {
                valueAsNumber: true,
              })}
              type="number"
              placeholder="credits"
            />
          </div>
          <div>
            <label>name</label>
            <input {...formMethods.register("event.name")} placeholder="name" />
          </div>
          <div>
            <label>description</label>
            <input
              {...formMethods.register("event.description")}
              placeholder="name"
            />
          </div>
        </fieldset>
        <fieldset className="mb-4">
          <legend>options</legend>
          {fields.map((field, index) => (
            <div key={field.id}>
              <label>Option {index}</label>
              <input
                {...formMethods.register(`options.${index}.name`)}
                placeholder="name"
              />
              <input
                {...formMethods.register(`options.${index}.description`)}
                placeholder="description"
              />
              <button type="button" onClick={deleteOption(index)}>
                delete
              </button>
            </div>
          ))}
          <button type="button" onClick={addOption}>
            add option
          </button>
        </fieldset>
        <button type="submit">submit</button>
      </form>
    </FormProvider>
  );
};

const option = z.object({
  name: z.string(),
  description: z.string(),
});

const schema = z.object({
  event: z.object({
    name: z.string(),
    credits: z.number().min(1),
    description: z.string(),
  }),
  options: z.array(option).min(2),
});
type FormProps = z.infer<typeof schema>;
