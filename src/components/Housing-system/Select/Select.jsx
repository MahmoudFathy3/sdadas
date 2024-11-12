import { Autocomplete, FormControl, FormLabel, TextField } from "@mui/material";
import PropTypes from "prop-types";

const Select = ({
  id,
  label,
  options,
  required,
  value,
  defaultValue,
  setState,
  placeholder,
  disabled,
}) => {
  return (
    <FormControl sx={{ gap: 1, width: "100%" }}>
      <FormLabel htmlFor={id}>
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </FormLabel>
      <Autocomplete
        disablePortal
        id={id}
        disabled={disabled}
        options={options || []}
        filterSelectedOptions={true}
        renderOption={(props, option) => {
          return (
            <div {...props} key={option.id} data-value={option.id}>
              <li> {option.label}</li>
            </div>
          );
        }}
        onChange={(e, value) => setState && setState(value)}
        defaultValue={defaultValue || ""}
        value={value}
        renderInput={(params) => (
          <TextField
            id={id}
            name={id}
            {...params}
            required={required}
            placeholder={placeholder}
          />
        )}
      />
    </FormControl>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.any,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  setState: PropTypes.func,
  placeholder: PropTypes.string,
};

export default Select;
