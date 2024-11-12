import { useEffect, useState } from "react";
import { FormLabel } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import PropTypes from "prop-types";

const DateTime = ({ defaultValue }) => {
  const [value, setValue] = useState(dayjs());

  console.log(defaultValue);

  useEffect(() => {
    if (defaultValue) {
      setValue(dayjs(defaultValue));
    }
  }, [defaultValue]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <FormLabel>
          تاريخ الفاتورة <span style={{ color: "red" }}>*</span>
        </FormLabel>
        <DateTimePicker
          name="invoiceData"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
          disableOpenPicker
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

DateTime.propTypes = {
  defaultValue: PropTypes.any,
};

export default DateTime;
