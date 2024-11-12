import styles from "@styles/forms.module.css";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import FormControlls from "@components/Housing-system/FormControlls/FormControlls";
import FormButtons from "@components/Housing-system/FormButtons/FormButtons";
import Complexe from "@components/Housing-system/Select/Shared/Complexe/Complexe";
import { onReset } from "@utils/onReset";
import { useState } from "react";
import Select from "@components/Housing-system/Select/Select";

const FormServices = ({ onSubmit, reset, service, edit, isLoading }) => {
  const [managementId, setManagementId] = useState("");

  const handlerSubmitted = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    let services = {
      name: data.name,
      price: data.price,
      description: data.description,
      managementId: managementId || service?.managementId,
      isActive: data.isActive === "تشغيل" ? true : false,
    };

    if (edit) services.id = service.id;

    onSubmit(services);

    onReset(event.currentTarget.reset());
  };

  return (
    <Box component={"form"} onSubmit={handlerSubmitted} className={styles.form}>
      <div className={styles.form_wapper}>
        <FormControlls
          id="name"
          label="اسم الخدمة"
          type="text"
          fullWidth
          required={true}
          defaultValue={service?.name}
        />

        <Complexe
          id="managementId"
          label="اسم المجمع"
          setState={setManagementId}
          defaultValue={service?.managementId}
        />

        <FormControlls
          id="price"
          label="السعر"
          type="number"
          fullWidth
          required={true}
          defaultValue={service?.price}
        />

        <FormControlls
          id="description"
          label="الوصف"
          type="text"
          fullWidth
          required={true}
          defaultValue={service?.description}
        />

        <Select
          id="isActive"
          label="الحالة"
          options={[
            { id: 1, label: "ايقاف" },
            { id: 2, label: "تشغيل" },
          ]}
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

FormServices.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  reset: PropTypes.bool,
  edit: PropTypes.bool,
  service: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default FormServices;
