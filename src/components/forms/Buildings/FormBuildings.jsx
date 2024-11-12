import styles from "@styles/forms.module.css";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import FormControlls from "@components/Housing-system/FormControlls/FormControlls";
import FormButtons from "@components/Housing-system/FormButtons/FormButtons";
import { onReset } from "@utils/onReset";
import Status from "@components/Housing-system/Select/Shared/Status/Status";
import { useState } from "react";
import Complexe from "@components/Housing-system/Select/Shared/Complexe/Complexe";

const FormBuildings = ({ onSubmit, build, reset, edit, isLoading }) => {
  const [managementIdId, setManagementId] = useState("");
  const [statusId, setStatusID] = useState("");

  const handlerSubmitted = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    let buildings = {
      name: data.name,
      buildingPrefix: data.buildingPrefix,
      totalFloor: Number(data.totalFloor),
      unitPerFloor: Number(data.unitPerFloor),
      description: data.description,
      managementId: managementIdId || build?.managementId,
      status: statusId || build?.status,
    };

    if (edit) buildings.id = build?.id;

    onSubmit(buildings);
    onReset(event.currentTarget.reset());
  };

  return (
    <Box
      component={"form"}
      action="POST"
      onSubmit={handlerSubmitted}
      className={styles.form}
    >
      <div className={styles.form_wapper}>
        <Complexe
          id="managementId"
          defaultValue={build?.managementId}
          setState={setManagementId}
        />

        <FormControlls
          id="name"
          label="اسم المبني"
          type="text"
          fullWidth
          required={true}
          defaultValue={build?.name}
        />

        <FormControlls
          id="buildingPrefix"
          label="رقم المبني"
          fullWidth
          required={true}
          defaultValue={build?.buildingPrefix}
        />

        <FormControlls
          id="totalFloor"
          label="عدد الطوابق"
          fullWidth
          required={true}
          defaultValue={build?.totalFloor}
        />

        <FormControlls
          id="unitPerFloor"
          label="عدد الوحدات لكل طابق"
          type="number"
          fullWidth
          required={true}
          defaultValue={build?.unitPerFloor}
        />

        <FormControlls
          id="description"
          label="الوصف"
          type="text"
          fullWidth
          required={true}
          defaultValue={build?.description}
        />
        <Status setStatusID={setStatusID} defaultValue={build?.status} />
      </div>
      <FormButtons
        onReset={reset && onReset}
        edit={edit}
        isLoading={isLoading}
      />
    </Box>
  );
};

FormBuildings.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  build: PropTypes.object,
  reset: PropTypes.bool,
  edit: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default FormBuildings;
