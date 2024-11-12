import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Select from "@components/Housing-system/Select/Select";

const UnitFurnishType = ({ setStateID, defaultValue }) => {
  const [value, setValue] = useState("");

  const Options = useMemo(() => {
    return [
      { id: 0, label: "UFTNull" },
      { id: 1, label: "Furnished" },
      { id: 2, label: "SemiFurnished" },
      { id: 3, label: "NonFurnished" },
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
    <>
      <Select
        id="unitFurnishType"
        label="حالة اثاث الوحدة"
        options={Options || []}
        required={true}
        setState={setValue}
        value={value}
      />
    </>
  );
};

UnitFurnishType.propTypes = {
  setStateID: PropTypes.func.isRequired,
  defaultValue: PropTypes.number,
};

export default UnitFurnishType;
