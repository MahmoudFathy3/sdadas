import PropTypes from "prop-types";
import Select from "../../Select";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchComplexes } from "@store/reducers/Complexes/ComplexeSlice";

const Complexe = ({ id, label, setState, defaultValue, placeholder }) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const { complexes } = useSelector((state) => state.complexes);

  useEffect(() => {
    dispatch(fetchComplexes(0));
  }, [dispatch]);

  useEffect(() => {
    if (defaultValue) {
      setValue(
        complexes?.data?.find((complexe) => complexe.id === defaultValue)
          ?.name || ""
      );
    }
  }, [defaultValue, complexes]);

  useEffect(() => {
    if (value?.id) {
      setState(value?.id);
    }
  }, [value, setState]);

  return (
    <Select
      id={id}
      label={label || "المجمع"}
      options={complexes?.data?.map((complexe) => ({
        id: complexe.id,
        label: complexe.name,
      }))}
      value={value}
      required={true}
      setState={setValue}
      placeholder={placeholder}
    />
  );
};

Complexe.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  setState: PropTypes.func,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
};

export default Complexe;
