import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../Select";
import { fetchUnitByManagementID } from "@store/reducers/Units/UnitsSlice";

const UnitForComplexe = ({
  id,
  label,
  complexe_id,
  setState,
  defaultValue,
}) => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  const { unitByManagementId } = useSelector((state) => state.units);

  useEffect(() => {
    complexe_id &&
      dispatch(fetchUnitByManagementID({ managementId: complexe_id }));
  }, [dispatch, complexe_id]);

  useEffect(() => {
    if (defaultValue) {
      setValue(
        unitByManagementId?.data?.find((unit) => unit.id === defaultValue)
          ?.unitPrefix || ""
      );
    }
  }, [defaultValue, unitByManagementId]);

  useEffect(() => {
    if (value?.id) {
      setState(value?.id);
    }
  }, [value, setState]);

  return (
    <Select
      id={id || "unitId"}
      label={label}
      options={
        unitByManagementId?.data?.map((unit) => ({
          id: unit.id,
          label: unit.unitPrefix,
        })) || []
      }
      setState={setValue}
      value={value}
    />
  );
};

UnitForComplexe.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  complexe_id: PropTypes.any,
  defaultValue: PropTypes.any,
  setState: PropTypes.func,
};

export default UnitForComplexe;
