import { useState } from "react";
import styles from "@styles/forms.module.css";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import Complexe from "@components/Housing-system/Select/Shared/Complexe/Complexe";
import FormControlls from "@components/Housing-system/FormControlls/FormControlls";
import FormButtons from "@components/Housing-system/FormButtons/FormButtons";
import { onReset } from "@utils/onReset";

const FromCrafts = ({ onSubmit, reset, data, edit, isLoading }) => {
  const [managementId, setManagementId] = useState("");

  const handlerSubmitted = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    let craft = {
      name: formData.get("name"),
      managementId: managementId || data?.managementId,
    };

    edit
      ? onSubmit({ id: data.id, name: formData.get("name") })
      : onSubmit(craft);

    event.currentTarget.reset();
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
          id="complexe"
          label="اسم المجمع"
          setState={setManagementId}
          defaultValue={data?.managementId}
        />

        <FormControlls
          id="name"
          label="اسم الخدمة"
          required={true}
          defaultValue={data?.name}
        />
      </div>

      <FormButtons
        onReset={reset && onReset}
        edit={edit}
        isLoading={isLoading}
      />
    </Box>
  );
};

FromCrafts.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object,
  reset: PropTypes.bool,
  edit: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default FromCrafts;
