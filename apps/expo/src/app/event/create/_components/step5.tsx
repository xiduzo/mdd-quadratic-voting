import { useCallback, useRef } from "react";
import { View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { useFormContext } from "react-hook-form";

import { IconButton } from "~/_components/Button";
import { Typography } from "~/_components/Typography";
import type { FormData } from "../index";

export const Step5 = () => {
  const { setValue, getValues } = useFormContext<FormData>();
  const calendarRef = useRef<CalendarPicker | null>(null);
  const handlePressNext = useCallback(() => {
    calendarRef?.current?.handleOnPressNext();
  }, []);

  const handleOnPressPrevious = useCallback(() => {
    calendarRef?.current?.handleOnPressPrevious();
  }, []);

  const handleDateChange = useCallback(
    (date: unknown, type: "START_DATE" | "END_DATE") => {
      if (date === null) return;
      if (type === "START_DATE") setValue("endDate", undefined);

      setValue(
        type === "START_DATE" ? "startDate" : "endDate",
        new Date(date as string),
      );
    },
    [setValue],
  );

  return (
    <View className="mt-8 grow">
      <Typography intent="4xl" className="mb-12">
        Choose dates
      </Typography>
      <CalendarPicker
        selectedStartDate={getValues("startDate")}
        selectedEndDate={getValues("endDate")}
        previousComponent={
          <IconButton
            icon="chevron-left"
            onPress={handleOnPressPrevious}
            className="rounded-md"
          />
        }
        onDateChange={handleDateChange}
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
