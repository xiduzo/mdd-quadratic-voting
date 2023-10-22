import { useCallback } from "react";
import { SafeAreaView, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "~/_components/Button";
import { Input } from "~/_components/Input";
import { useSecureStore } from "~/hooks/useSecureStore";

interface FormData {
  name: string;
}
const generateUUID = () => {
  // Public Domain/MIT
  let d = new Date().getTime(); //Timestamp
  let d2 = performance?.now?.() ?? 0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

const SignUpPage = () => {
  const formMethods = useForm<FormData>({});

  const { saveToken: saveUser } = useSecureStore("user");
  const { saveToken } = useSecureStore("token");
  const { replace } = useRouter();

  const handleSubmit = useCallback(
    async (data: FormData) => {
      console.log({ data });
      await saveUser(data.name);
      await saveToken(generateUUID());
      replace("/event/");
    },
    [saveUser, saveToken, replace],
  );

  return (
    <SafeAreaView className="bg-primary">
      <Stack.Screen
        options={{
          title: "Sign up",
        }}
      />

      <View className="h-full w-full px-8">
        <FormProvider {...formMethods}>
          <Input name="name" placeholder="your name" />
          <Button
            title="Sign up"
            onPress={formMethods.handleSubmit(handleSubmit)}
          />
        </FormProvider>
      </View>
    </SafeAreaView>
  );
};

export default SignUpPage;
