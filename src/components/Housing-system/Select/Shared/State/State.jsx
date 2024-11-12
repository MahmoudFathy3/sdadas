import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchGovernorates } from "@store/reducers/Governorate/GovernorateSlice";
import Select from "../../Select";
import { IconButton } from "@mui/material";
import { FaPlus } from "react-icons/fa";

const State = ({ setStateID, classes, Add, openModal, defaultValue }) => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  const { governorates } = useSelector((state) => state.governorate);

  useEffect(() => {
    dispatch(fetchGovernorates(0));
  }, [dispatch]);

  useEffect(() => {
    if (defaultValue) {
      setValue(
        governorates?.data?.find(
          (governorate) => governorate.id === defaultValue
        )?.name || ""
      );
    }
  }, [defaultValue, governorates]);

  useEffect(() => {
    if (value?.id) {
      setStateID(value?.id);
    }
  }, [value, setStateID]);

  return (
    <div style={{ position: "relative" }}>
      <Select
        id="stateId"
        label="المحافظة"
        options={governorates?.data?.map((state) => ({
          id: state.id,
          label: state.name,
        }))}
        required={true}
        d
        setState={setValue}
        value={value}
      />
      {Add && (
        <div className={classes?.Add}>
          <IconButton onClick={openModal}>
            <FaPlus />
          </IconButton>
        </div>
      )}
    </div>
  );
};

State.propTypes = {
  setStateID: PropTypes.func,
  classes: PropTypes.object,
  Add: PropTypes.bool,
  openModal: PropTypes.func,
  defaultValue: PropTypes.any,
};

export default State;
