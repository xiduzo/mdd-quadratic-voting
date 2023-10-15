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
      <Typography intent="4xl" className="mb-12">
        Choose dates
      </Typography>
      <CalendarPicker
        previousComponent={
          <IconButton
            icon="chevron-left"
            onPress={handleOnPressPrevious}
            className="rounded-md"
          />
        }
        nextComponent={
          <IconButton
            icon="chevron-right"
            onPress={handlePressNext}
            className="rounded-md"
          />
        }
        headerWrapperStyle={
          {
            // backgroundColor: "green",
          }
        }
        monthYearHeaderWrapperStyle={
          {
            // backgroundColor: "red",
          }
        }
        monthTitleStyle={{
          fontWeight: "600",
        }}
        yearTitleStyle={{
          fontWeight: "600",
        }}
        ref={calendarRef}
        minDate={new Date()}
        restrictMonthNavigation
        allowRangeSelection
        allowBackwardRangeSelect
        dayLabelsWrapper={{
          borderColor: "#2F4858",
        }}
        todayBackgroundColor="#219EBC"
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
  );
};
