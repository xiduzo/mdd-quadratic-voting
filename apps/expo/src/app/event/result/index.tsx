import { View } from "react-native";
import { Stack } from "expo-router";

import { Navigation } from "~/_components/Navigation";
import { Typography } from "~/_components/Typography";

const CreateEvent = () => {
  return (
    <View className="bg-primary">
      <Stack.Screen options={{ title: "Results", animation: "none" }} />
      <Navigation activeItem="results" />
      <View className="h-full w-full">
        <Typography intent="2xl" className="mb-4 mt-24 px-8">
          New
        </Typography>
      </View>
    </View>
  );
};

export default CreateEvent;
