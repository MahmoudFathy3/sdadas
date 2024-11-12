import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Select from "../../Select";

const Status = ({ setStatusID, defaultValue, label, required, id }) => {
  const [value, setValue] = useState("");
  const [requireds, setRequireds] = useState(true);

  const Options = useMemo(() => {
    return [
      { id: 0, label: "بدون قيمة" },
      { id: 1, label: "فعال" },
      { id: 2, label: "معلق" },
    ];
  }, []);

  useEffect(() => {
    if (typeof defaultValue === "number") {
      setValue(Options?.find((option) => option.id === defaultValue)?.label);
    }
  }, [defaultValue, Options]);

  useEffect(() => {
    if (value?.id >= 0) setStatusID(value?.id);
  }, [value, setStatusID]);

  useEffect(() => {
    if (!required) setRequireds(required);
  }, [required]);

  return (
    <>
      <Select
        id={id || "status"}
        label={label || "الحالة"}
        options={Options || []}
        required={requireds}
        setState={setValue}
        value={value}
      />
    </>
  );
};

Status.propTypes = {
  setStatusID: PropTypes.func,
  defaultValue: PropTypes.any,
  label: PropTypes.string,
  required: PropTypes.bool,
  id: PropTypes.string,
};

export default Status;
