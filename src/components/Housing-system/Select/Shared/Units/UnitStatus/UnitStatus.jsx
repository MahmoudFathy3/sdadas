import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Select from "@components/Housing-system/Select/Select";

const UnitStatus = ({ setStateID, defaultValue }) => {
  const [value, setValue] = useState("");

  const Options = useMemo(() => {
    return [
      { id: 0, label: "USNull" },
      { id: 1, label: "Sold" },
      { id: 2, label: "UnSold" },
      { id: 3, label: "Defective" },
      { id: 4, label: "Rejected" },
      { id: 5, label: "LoanRejected" },
      { id: 6, label: "Requested" },
    ];
  }, []);

  useEffect(() => {
    if (typeof defaultValue === "number") {
      setValue(Options?.find((option) => option.id === defaultValue)?.label);
    }
  }, [defaultValue, Options]);

  useEffect(() => {
    if (value?.id >= 0) setStateID(value?.id);
  }, [value, setStateID]);

  return (
    <Select
      id="unitStatus"
      label="حالة الوحدة"
      options={Options || []}
      required={true}
      setState={setValue}
      value={value}
    />
  );
};

UnitStatus.propTypes = {
  setStateID: PropTypes.func.isRequired,
  defaultValue: PropTypes.number,
};

export default UnitStatus;
