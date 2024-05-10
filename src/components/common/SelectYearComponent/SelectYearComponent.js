import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Stack } from "@mui/material";

const SelectYearComponent = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const startYear = selectedYear - 5;
  const endYear = selectedYear + 5;

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const yearOptions = [];
  for (let year = startYear; year <= endYear; year++) {
    yearOptions.push(
      <MenuItem key={year} value={year}>
        {year}
      </MenuItem>
    );
  }
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);
  useEffect(() => {
    if (selectedYear) {
      const monthStartDates = [];
      const monthEndDates = [];

      for (let month = 0; month < 12; month++) {
        const startDate = new Date(selectedYear, month, 1);
        const endDate = new Date(selectedYear, month + 1, 0);

        monthStartDates.push(startDate);
        monthEndDates.push(endDate);
      }
      setStartDate(monthStartDates);
      setEndDate(monthEndDates);
    }
  }, [selectedYear]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const handleMontChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };
  const monthOptions = [];
  for (let month = 0; month <= monthNames.length; month++) {
    monthOptions.push(
      <MenuItem key={month} value={month}>
        {monthNames[month]}
      </MenuItem>
    );
  }
  const [startDateMonth, setStartDateMMonth] = useState([]);
  const [endDateMonth, setEndDateMonth] = useState([]);
  useEffect(() => {
    if (selectedMonth) {
      setStartDateMMonth(startDate[selectedMonth]);
      setEndDateMonth(endDate[selectedMonth]);
    }
  }, [selectedMonth, startDate, endDate]);

  console.log(startDateMonth, "1", endDateMonth);
  return (
    <Stack sx={{ flexDirection: "row" }}>
      <Select value={selectedMonth} onChange={handleMontChange}>
        {monthOptions}
      </Select>
      <Select value={selectedYear} onChange={handleYearChange}>
        {yearOptions}
      </Select>
    </Stack>
  );
};

export default SelectYearComponent;
