"use client";

import type { DateRange } from "@/app/analytics/types";
import { DateRangePicker } from "@/components/analytics/date-range-picker";
import { getInitialDateRange } from "@/lib/analytics-service";
import * as React from "react";

export function DashboardDatePicker() {
  const [dateRange, setDateRange] = React.useState<DateRange>(
    getInitialDateRange()
  );

  const handleDateRangeChange = (newRange: DateRange) => {
    setDateRange(newRange);
  };

  return (
    <DateRangePicker
      dateRange={dateRange}
      onDateRangeChange={handleDateRangeChange}
    />
  );
}
