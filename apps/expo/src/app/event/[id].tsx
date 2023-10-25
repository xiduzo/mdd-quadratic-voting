import { useCallback, useEffect, useMemo, useState } from "react";
import { TouchableHighlight, View } from "react-native";
import { Stack, useGlobalSearchParams } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import { Button } from "~/_components/Button";
import { Typography } from "~/_components/Typography";
import { api } from "~/utils/api";
import { EggBasket } from "./_components/EggBasket";
import { EggButton } from "./_components/EggButton";

const EventDetailPage = () => {
  const context = api.useContext();
  const { id } = useGlobalSearchParams();
  const { data } = api.event.byId.useQuery(id as unknown as string);
  const { data: userVotes } = api.vote.byEventId.useQuery(
    id as unknown as string,
  );
  const { mutateAsync, isLoading } = api.vote.create.useMutation({
    onSuccess: async () => {
      await context.vote.byEventId.invalidate();
    },
  });

  const [creditsSpend, setCreditsSpend] = useState<Record<string, number>>({});

  const [update, setUpdate] = useState(true);
  const [selectedItem, setSelectedItem] = useState("");

  const credits = useMemo(() => {
    const spend = Object.values(creditsSpend).reduce((acc, curr) => {
      return acc + curr * curr;
    }, 0);

    return (data?.credits ?? 100) - spend;
  }, [creditsSpend, data, update]);

  const nextCredits = useMemo(() => {
    const current = creditsSpend[selectedItem] ?? 0;
    const currentTokens = current + current;
    const nextTokens = (current + 1) * (current + 1);

    return Math.abs(nextTokens - currentTokens);
  }, [creditsSpend, update, selectedItem]);

  useEffect(() => {
    if (!userVotes?.options) return;

    const credits = userVotes.options.reduce(
      (acc, curr) => {
        acc[curr.id] = curr.votes[0]?.credits ?? 0;
        return acc;
      },
      {} as Record<string, number>,
    );

    setCreditsSpend((_) => credits);
  }, [userVotes]);

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

  const handleSubmit = useCallback(async () => {
    await mutateAsync(
      Object.keys(creditsSpend).map((optionId) => ({
        optionId,
        credits: creditsSpend[optionId] ?? 0,
      })),
    );
  }, [creditsSpend, mutateAsync]);

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
        <View className="mb-12 mt-8 flex-row items-center justify-between space-x-8 px-8">
          <View className="flex flex-row space-x-4">
            <EggButton
              icon="minus"
              onPress={decrementCreditsSpend}
              disabled={
                !selectedItem ||
                (nextCredits > credits && (creditsSpend[selectedItem] ?? 0) < 0)
              }
            />
            <Typography intent="3xl" className="min-w-[12vw] text-center">
              {credits}
            </Typography>
            <EggButton
              icon="plus"
              onPress={incrementCreditsSpend}
              disabled={
                !selectedItem ||
                (nextCredits > credits && (creditsSpend[selectedItem] ?? 0) > 0)
              }
            />
          </View>
          <Button
            intent="action"
            title="Submit"
            className="grow"
            disabled={isLoading}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </View>
  );
};

export default EventDetailPage;
