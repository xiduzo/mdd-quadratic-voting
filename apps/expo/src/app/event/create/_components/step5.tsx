import { useCallback, useRef } from "react";
import { View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";

import { IconButton } from "~/_components/Button";
import { Typography } from "~/_components/Typography";

export const Step5 = () => {
  const calendarRef = useRef<CalendarPicker | null>(null);
  const handlePressNext = useCallback(() => {
    calendarRef?.current?.handleOnPressNext();
  }, []);

  const handleOnPressPrevious = useCallback(() => {
    calendarRef?.current?.handleOnPressPrevious();
  }, []);

  return (
    <View className="mt-8 grow">
      <Typography intent="4xl">Choose dates</Typography>
      <View className="flex grow justify-center">
        <CalendarPicker
          nextComponent={
            <IconButton icon="chevron-right" onPress={handlePressNext} />
          }
          previousComponent={
            <IconButton icon="chevron-left" onPress={handleOnPressPrevious} />
          }
          ref={calendarRef}
          minDate={new Date()}
          restrictMonthNavigation
          allowRangeSelection
          allowBackwardRangeSelect
          dayLabelsWrapper={{
            borderColor: "#2F4858",
          }}
          todayBackgroundColor="#219EBC40"
          customDayHeaderStyles={() => ({
            textStyle: {
              fontWeight: "600",
              color: "#ffffff60",
            },
          })}
          textStyle={{
            color: "white",
          }}
          selectedRangeStyle={{
            backgroundColor: "#F6AE2D",
          }}
        />
      </View>
    </View>
  );
};
