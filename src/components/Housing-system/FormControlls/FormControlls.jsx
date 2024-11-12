import PropTypes from "prop-types";
import { FormControl, FormLabel, IconButton, TextField } from "@mui/material";
import { FaPlus } from "react-icons/fa";

const FormControlls = ({
  id,
  type,
  label,
  required,
  value,
  defaultValue,
  onChange,
  error,
  helperText,
  fullWidth,
  disabled,
  classes,
  style,
  Add,
  openModal,
}) => {
  return (
    <FormControl sx={{ gap: 1, width: "100%" }} style={style}>
      <FormLabel htmlFor={id} className={classes?.label}>
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </FormLabel>
      <TextField
        variant="outlined"
        id={id}
        name={id}
        type={type}
        required={required}
        disabled={disabled}
        error={error}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        helperText={helperText}
        fullWidth={fullWidth}
        className={classes?.input}
      />
      {Add && (
        <div className={classes?.Add}>
          <IconButton onClick={openModal}>
            <FaPlus />
          </IconButton>
        </div>
      )}
    </FormControl>
  );
};

FormControlls.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  classes: PropTypes.object,
  style: PropTypes.object,
  Add: PropTypes.bool,
  openModal: PropTypes.func,
};

export default FormControlls;
