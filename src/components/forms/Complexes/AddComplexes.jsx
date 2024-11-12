import { useState } from "react";
import styles from "@styles/forms.module.css";
import PropTypes from "prop-types";
import FormControlls from "@components/Housing-system/FormControlls/FormControlls";
import { Box } from "@mui/material";
import FormButtons from "@components/Housing-system/FormButtons/FormButtons";
import { onReset } from "@utils/onReset";
import Status from "@components/Housing-system/Select/Shared/Status/Status";
import State from "@components/Housing-system/Select/Shared/State/State";
import InvoiceCalculationType from "@components/Housing-system/Select/Shared/InvoiceCalculationType/InvoiceCalculationType";

const AddComplexes = ({ onSubmit, openModal, isLoading }) => {
  const [statusId, setStatusID] = useState("");
  const [TypeInvoiceId, setTypeInvoiceID] = useState("");
  const [stateID, setStateID] = useState("");

  const HandlerSubmitted = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    let list = {
      name: data.name,
      phoneNumber: data.phoneNumber,
      officeNumber: data.officeNumber,
      emailAddress: data.emailAddress,
      address1: data.address1,
      address2: data.address2,
      stateId: Number(stateID),
      city: data.city,
      country: data.country,
      side: data.side,
      invoiceCommission: Number(formData.get("invoiceCommission")),
      invoiceCalculationType: Number(TypeInvoiceId),
      numberOfUnit: Number(data.numberOfUnit),
      status: Number(statusId),
    };

    if (data.domain) list.domain = formData.get("domain");
    if (data.description) list.description = formData.get("description");

    console.log(list);

    onSubmit(list);
    event.currentTarget.reset();
  };

  return (
    <Box component={"form"} onSubmit={HandlerSubmitted} className={styles.form}>
      <div className={styles.form_wapper}>
        <FormControlls
          id="name"
          label="اسم المجمع"
          type="text"
          fullWidth
          required={true}
        />
        <FormControlls
          id="phoneNumber"
          label="رقم الهاتف"
          type="number"
          fullWidth
          required={true}
        />
        <FormControlls
          id="officeNumber"
          label="رقم المكتب"
          type="number"
          fullWidth
          required={true}
        />
        <FormControlls
          id="emailAddress"
          label="البريد الالكتروني"
          type="email"
          fullWidth
          required={true}
        />
        <FormControlls
          id="address1"
          label="العنوان 1"
          type="text"
          fullWidth
          required={true}
        />
        <FormControlls
          id="address2"
          label="العنوان 2"
          type="text"
          fullWidth
          required={true}
        />

        <State
          setStateID={setStateID}
          Add={true}
          classes={{ input: styles.input, Add: styles.Add }}
          openModal={openModal}
        />

        <FormControlls
          id="city"
          label="المدينة"
          type="text"
          fullWidth
          required={true}
        />
        <FormControlls
          id="country"
          label="القضاء"
          type="text"
          fullWidth
          required={true}
        />
        <FormControlls
          id="side"
          label="الناحية"
          type="text"
          fullWidth
          required={true}
        />
        {/* if Percentage !> 100 % */}

        <InvoiceCalculationType setStateId={setTypeInvoiceID} />

        <FormControlls
          id="invoiceCommission"
          label="قيمة العمولة"
          type="number"
          fullWidth
          required={true}
        />

        <FormControlls
          id="numberOfUnit"
          label="عدد الوحدات"
          type="number"
          fullWidth
          required={true}
        />

        <Status setStatusID={setStatusID} />

        <FormControlls
          id="domain"
          label="Domain"
          type="text"
          fullWidth
          required={true}
        />
      </div>
      <FormControlls
        id="description"
        label="الوصف"
        type="text"
        fullWidth
        style={{ marginTop: "20px" }}
      />
      <FormButtons onReset={onReset} isLoading={isLoading} />
    </Box>
  );
};

AddComplexes.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default AddComplexes;
