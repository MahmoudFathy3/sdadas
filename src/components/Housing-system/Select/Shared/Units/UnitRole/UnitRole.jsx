import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Select from "@components/Housing-system/Select/Select";

const UnitRole = ({ id, label, setStateID, defaultValue }) => {
  const [value, setValue] = useState("");

  const Options = useMemo(() => {
    return [
      { id: 0, label: "Nope" },
      { id: 1, label: "Owner" },
      { id: 2, label: "Tenant" },
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
      id={id}
      label={label}
      options={Options || []}
      required={true}
      setState={setValue}
      value={value}
    />
  );
};

UnitRole.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  setStateID: PropTypes.func.isRequired,
  defaultValue: PropTypes.number,
};

export default UnitRole;
