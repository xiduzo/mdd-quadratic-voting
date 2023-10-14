import { Dimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import { Navigation } from "~/_components/Navigation";
import { Typography } from "~/_components/Typography";
import { Event } from "./_components/Event";

const SPACING_FOR_CARD_INSET = Dimensions.get("window").width * 0.1 - 10;
const CARD_WIDTH = Dimensions.get("window").width * 0.8;
const CARD_HEIGHT = Dimensions.get("window").height * 0.7;

const EventPage = () => {
  return (
    <SafeAreaView className="bg-primary">
      <Stack.Screen options={{ title: "Events" }} />
      <View className="h-full w-full">
        <Typography intent="2xl" className="mb-4 mt-12 px-8">
          New
        </Typography>
        <FlashList
          horizontal
          style={{
            marginVertical: 10,
          }}
          data={[1, 2, 3]}
          renderItem={() => (
            <Event
              title="test event"
              description="test description"
              tokens={4}
              maxTokens={445}
              endDate={new Date()}
            />
          )}
        />
        <Navigation activeItem="events" />
      </View>
    </SafeAreaView>
  );
};

export default EventPage;
