import { useCallback, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import { Stack } from "expo-router";
import type { ViewToken } from "@shopify/flash-list";
import { FlashList } from "@shopify/flash-list";

import { Navigation } from "~/_components/Navigation";
import { Typography } from "~/_components/Typography";
import { Event } from "./_components/Event";

const EventPage = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const flashList = useRef<FlashList<number> | null>(null);

  const handleViewableItemsChanged = useCallback(
    (props: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      const activeItems = props.viewableItems.filter((item) => item.isViewable);
      const isFirstItemVisible = activeItems[0]?.index === 0;
      const newIndex =
        activeItems.length === 3 ? 1 : isFirstItemVisible ? 0 : 2;
      setActiveIndex(newIndex);
    },
    [setActiveIndex],
  );

  return (
    <View className="bg-primary">
      <Stack.Screen options={{ title: "Events", animation: "none" }} />
      <Navigation activeItem="events" />
      <View className="h-full w-full">
        <Typography intent="2xl" className="mb-4 mt-24 px-8">
          New
        </Typography>
        <FlashList
          ref={flashList}
          estimatedItemSize={200}
          initialScrollIndex={activeIndex}
          decelerationRate="fast"
          snapToInterval={Dimensions.get("window").height * 0.3}
          onViewableItemsChanged={handleViewableItemsChanged}
          snapToAlignment="center"
          horizontal
          contentContainerStyle={{
            paddingHorizontal: 8,
          }}
          data={[1, 2, 3]}
          renderItem={(item) => (
            <Event
              isActive={activeIndex === item.index}
              extraClass="min-w-[60vw] mx-4"
              title="test event"
              description="test description"
              tokens={4}
              maxTokens={445}
              endDate={new Date()}
            />
          )}
        />
        <View className="my-4 flex w-full flex-row justify-center space-x-2">
          {[0, 1, 2].map((item) => (
            <View
              className={`h-2 w-2 rounded-full ${
                item === activeIndex ? "bg-slate-400" : "bg-slate-600"
              }`}
              key={item}
            />
          ))}
        </View>
        <Typography intent="2xl" className="mb-4 mt-12 px-8">
          Trending
        </Typography>
        <View className="space-between flex w-full flex-row px-8">
          <Event
            size="sm"
            extraClass="grow"
            title="test event big"
            description="test description"
            tokens={4}
            maxTokens={445}
            endDate={new Date()}
          />
          <Event
            size="sm"
            extraClass="grow ml-4"
            title="test event"
            description="test description"
            tokens={4}
            maxTokens={445}
            endDate={new Date()}
          />
        </View>
      </View>
    </View>
  );
};

export default EventPage;
