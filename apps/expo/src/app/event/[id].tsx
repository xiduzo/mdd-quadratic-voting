import { useCallback, useEffect, useState } from "react";
import { TouchableHighlight, View } from "react-native";
import { Stack, useGlobalSearchParams } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import { Button } from "~/_components/Button";
import { Typography } from "~/_components/Typography";
import { api } from "~/utils/api";
import { EggBasket } from "./_components/EggBasket";
import { EggButton } from "./_components/EggButton";

const EventDetailPage = () => {
  const { id } = useGlobalSearchParams();
  const { data } = api.event.byId.useQuery(id as unknown as string);

  const [credits, setCredits] = useState(0);
  const [creditsSpend, setCreditsSpend] = useState<Record<string, number>>({});
  const [_, setUpdate] = useState(true);
  const [selectedItem, setSelectedItem] = useState("");

  const incrementCreditsSpend = useCallback(() => {
    if (!selectedItem) return;
    setCreditsSpend((prev) => {
      prev[selectedItem] = (prev[selectedItem] ?? 0) + 1;
      return prev;
    });
    setUpdate((prev) => !prev);
  }, [selectedItem]);

  const decrementCreditsSpend = useCallback(() => {
    if (!selectedItem) return;
    setCreditsSpend((prev) => {
      prev[selectedItem] = (prev[selectedItem] ?? 0) - 1;
      return prev;
    });
    setUpdate((prev) => !prev);
  }, [selectedItem]);

  useEffect(() => {
    if (!data) return;

    setCredits(data.credits ?? 100);
    setCreditsSpend(
      data.options.reduce(
        (acc, option) => {
          acc[option.id] = 0;
          return acc;
        },
        {} as Record<string, number>,
      ),
    );
  }, [data]);

  console.log(creditsSpend[selectedItem]);

  return (
    <View className="bg-primary">
      <Stack.Screen
        options={{
          title: "Voting",
          animation: "none",
          headerBackVisible: true,
        }}
      />
      <View className="h-full w-full pt-12">
        <View className="px-8">
          <Typography intent="3xl">{data?.title}</Typography>
          <Typography className="mb-4">{data?.description}</Typography>
        </View>

        <FlashList
          className="px-8"
          estimatedItemSize={100}
          extraData={{
            selectedItem,
            creditsSpend,
          }}
          data={data?.options ?? []}
          contentContainerStyle={{}}
          ItemSeparatorComponent={() => <View className="h-4" />}
          renderItem={({ item }) => (
            <TouchableHighlight
              key={item.id}
              onPress={() => setSelectedItem(item.id)}
              className={`mx-8 rounded-md border-2 p-4 ${
                selectedItem === item.id
                  ? "border-transparent bg-white/40"
                  : "border-white"
              }`}
            >
              <View className="flex flex-row items-start justify-between">
                <View className="flex-grow">
                  <Typography>{item.name}</Typography>
                  <Typography>{item.description}</Typography>
                  <Typography>{creditsSpend[item.id] ?? 0} votes</Typography>
                  <Typography>
                    {(creditsSpend[item.id] ?? 0) *
                      (creditsSpend[item.id] ?? 0)}{" "}
                    credits
                  </Typography>
                </View>
                <View className="translate-x-10 scale-50">
                  <EggBasket
                    filledPercentage={
                      (((creditsSpend[item.id] ?? 0) *
                        (creditsSpend[item.id] ?? 0)) /
                        (data?.credits ?? 100)) *
                      100
                    }
                  />
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
        <View className="mb-12 mt-8 flex-row items-center space-x-8 px-8">
          <View className="flex flex-row space-x-4">
            <EggButton
              icon="minus"
              onPress={decrementCreditsSpend}
              disabled={!selectedItem}
            />
            <Typography intent="3xl">{credits}</Typography>
            <EggButton
              icon="plus"
              onPress={incrementCreditsSpend}
              disabled={!selectedItem}
            />
          </View>
          <Button intent="action" title="Submit" />
        </View>
      </View>
    </View>
  );
};

export default EventDetailPage;
