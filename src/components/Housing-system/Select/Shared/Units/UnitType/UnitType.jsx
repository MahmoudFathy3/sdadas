import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Select from "@components/Housing-system/Select/Select";

const UnitType = ({ setStateID, defaultValue }) => {
  const [value, setValue] = useState("");

  const Options = useMemo(() => {
    return [
      { id: 0, label: "UTNull" },
      { id: 1, label: "FreeHold" },
      { id: 2, label: "LeaseHold" },
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
      id="unitType"
      label="نوع الوحدة"
      options={Options || []}
      required={true}
      setState={setValue}
      value={value}
    />
  );
};

UnitType.propTypes = {
  setStateID: PropTypes.func.isRequired,
  defaultValue: PropTypes.number,
};

export default UnitType;
