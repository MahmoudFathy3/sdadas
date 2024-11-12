import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Select from "../../Select";

const InvoiceCalculationType = ({ setStateId, defaultValue }) => {
  const [value, setValue] = useState("");

  const Options = useMemo(() => {
    return [
      { id: 1, label: "Percentage" },
      { id: 2, label: "FixedAmount" },
    ];
  }, []);

  useEffect(() => {
    if (typeof defaultValue === "number") {
      setValue(Options?.find((option) => option.id === defaultValue)?.label);
    }
  }, [defaultValue, Options]);

  useEffect(() => {
    if (value?.id) setStateId(value?.id);
  }, [value, setStateId]);

  console.log(value);

  return (
    <Select
      id="invoiceCalculationType"
      label="نوع العمولة"
      options={Options || []}
      required={true}
      setState={setValue}
      value={value}
    />
  );
};

InvoiceCalculationType.propTypes = {
  setStateId: PropTypes.func,
  defaultValue: PropTypes.any,
};

export default InvoiceCalculationType;
