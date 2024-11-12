import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuildingForComplexe } from "@store/reducers/Building/BuildingSlice";
import Select from "../../Select";

const BuildingForComplexe = ({
  id,
  label,
  complexe_id,
  defaultValue,
  setState,
}) => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  const { buildForComplexe } = useSelector((state) => state.buildings);

  useEffect(() => {
    complexe_id && dispatch(fetchBuildingForComplexe(complexe_id));
  }, [dispatch, complexe_id]);

  useEffect(() => {
    if (defaultValue) {
      setValue(
        buildForComplexe?.data?.find(
          (build) => build.buildingId === defaultValue
        )?.buildingName || ""
      );
    }
  }, [defaultValue, buildForComplexe]);

  useEffect(() => {
    if (value?.id) {
      setState(value?.id);
    }
  }, [value, setState]);

  return (
    <Select
      id={id}
      label={label}
      options={buildForComplexe?.data?.map((build) => ({
        id: build.buildingId,
        label: build.buildingName,
      }))}
      value={value}
      required={true}
      setState={setValue}
    />
  );
};

BuildingForComplexe.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  complexe_id: PropTypes.any.isRequired,
  setState: PropTypes.func,
  defaultValue: PropTypes.any,
};

export default BuildingForComplexe;
