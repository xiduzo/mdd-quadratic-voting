import { useCallback, useState } from "react";
import { Dimensions, View } from "react-native";
import { Stack } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import type { ViewToken } from "@shopify/flash-list";

import { Navigation } from "~/_components/Navigation";
import { Typography } from "~/_components/Typography";
import { api } from "~/utils/api";
import { Event } from "./_components/Event";

const EventPage = () => {
  const { data } = api.event.latest.useQuery();

  const [activeIndex, setActiveIndex] = useState(0);

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
        <Typography intent="2xl" className="mb-4 mt-8 px-8">
          New
        </Typography>
        {data && (
          <FlashList
            estimatedItemSize={300}
            estimatedListSize={{
              width: Dimensions.get("window").width,
              height: 300,
            }}
            extraData={activeIndex}
            decelerationRate="fast"
            snapToInterval={Dimensions.get("window").width * 0.4}
            onViewableItemsChanged={handleViewableItemsChanged}
            snapToAlignment="center"
            horizontal
            contentContainerStyle={{
              paddingHorizontal: 8,
            }}
            data={data ?? []}
            renderItem={({ item, index }) => (
              <Event
                id={item.id}
                key={item.id}
                isActive={activeIndex === index}
                extraClass="min-w-[60vw] max-w-[60vw] mx-4 h-[30vh]"
                title={item.title}
                description={item.description}
                tokens={4}
                maxTokens={item.credits ?? 100}
                endDate={new Date(item.endDate ?? "")}
              />
            )}
          />
        )}

        <View className="my-4 flex w-full flex-row justify-center space-x-2">
          {Array.from({ length: (data ?? []).length }).map((_, index) => (
            <View
              className={`h-2 w-2 rounded-full ${
                index === activeIndex ? "bg-slate-400" : "bg-slate-600"
              }`}
              key={index}
            />
          ))}
        </View>
        <Typography intent="2xl" className="mb-4 mt-0 px-8">
          Trending
        </Typography>
        <View className="space-between flex w-full flex-row px-8">
          <Event
            id="1"
            size="sm"
            extraClass="grow"
            title="test event big"
            description="test description"
            tokens={4}
            maxTokens={445}
            endDate={new Date()}
          />
          <Event
            id="2"
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
