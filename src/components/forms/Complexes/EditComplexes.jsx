import styles from "@styles/forms.module.css";
import PropTypes from "prop-types";
import FormControlls from "@components/Housing-system/FormControlls/FormControlls";
import { Box } from "@mui/material";
import FormButtons from "@components/Housing-system/FormButtons/FormButtons";
import { useState } from "react";
import State from "@components/Housing-system/Select/Shared/State/State";
import Status from "@components/Housing-system/Select/Shared/Status/Status";
import InvoiceCalculationType from "@components/Housing-system/Select/Shared/InvoiceCalculationType/InvoiceCalculationType";

const EditComplexes = ({ onSubmit, complexe }) => {
  const [statusId, setStatusID] = useState("");
  const [TypeInvoiceId, setTypeInvoiceID] = useState("");
  const [stateID, setStateID] = useState("");


  const HandlerSubmitted = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    let list = {
      id: complexe?.id,
      name: data.name,
      phoneNumber: data.phoneNumber,
      officeNumber: data.officeNumber,
      emailAddress: data.emailAddress,
      address1: data.address1,
      address2: data.address2,
      stateId: Number(stateID) || complexe?.stateId,
      city: data.city,
      country: data.country,
      side: data.side,
      invoiceCommission: Number(formData.get("invoiceCommission")),
      invoiceCalculationType:
        Number(TypeInvoiceId) || complexe?.invoiceCalculationType,
      numberOfUnit: Number(data.numberOfUnit),
      status: Number(statusId) || complexe?.status,
    };

    if (data.domain) list.domain = formData.get("domain");
    if (data.description) list.description = formData.get("description");

    onSubmit(list);
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
          defaultValue={complexe?.name}
        />
        <FormControlls
          id="phoneNumber"
          label="رقم الهاتف"
          type="number"
          fullWidth
          required={true}
          defaultValue={complexe?.phoneNumber}
        />
        <FormControlls
          id="officeNumber"
          label="رقم المكتب"
          type="number"
          fullWidth
          required={true}
          defaultValue={complexe?.officeNumber}
        />
        <FormControlls
          id="emailAddress"
          label="البريد الالكتروني"
          type="email"
          fullWidth
          required={true}
          defaultValue={complexe?.emailAddress}
        />
        <FormControlls
          id="address1"
          label="العنوان 1"
          type="text"
          fullWidth
          required={true}
          defaultValue={complexe?.address1}
        />
        <FormControlls
          id="address2"
          label="العنوان 2"
          type="text"
          fullWidth
          required={true}
          defaultValue={complexe?.address2}
        />

        <State setStateID={setStateID} defaultValue={complexe?.stateId} />

        <FormControlls
          id="city"
          label="المدينة"
          type="text"
          fullWidth
          required={true}
          defaultValue={complexe?.city}
        />
        <FormControlls
          id="country"
          label="القضاء"
          type="text"
          fullWidth
          required={true}
          defaultValue={complexe?.country}
        />
        <FormControlls
          id="side"
          label="الناحية"
          type="text"
          fullWidth
          required={true}
          defaultValue={complexe?.side}
        />
        <InvoiceCalculationType
          defaultValue={complexe?.invoiceCalculationType}
          setStateId={setTypeInvoiceID}
        />
        {/* <Select
          id="invoiceCalculationType"
          label="نوع العمولة"
          options={[
            { id: 1, label: "Percentage" },
            { id: 2, label: "FixedAmount" },
          ]}
          required={true}
          setState={setTypeInvoiceID}
          defaultValue={
            (complexe?.invoiceCalculationType === 1 && "Percentage") ||
            (complexe?.invoiceCalculationType === 2 && "FixedAmount")
          }
        /> */}
        <FormControlls
          id="invoiceCommission"
          label="قيمة العمولة"
          type="number"
          fullWidth
          required={true}
          defaultValue={complexe?.invoiceCommission}
        />
        <FormControlls
          id="numberOfUnit"
          label="عدد الوحدات"
          type="number"
          fullWidth
          required={true}
          defaultValue={complexe?.numberOfUnit}
        />

        <Status setStatusID={setStatusID} defaultValue={complexe?.status} />

        <FormControlls
          id="domain"
          label="Domain"
          type="text"
          fullWidth
          defaultValue={complexe?.domain}
          required={true}
        />
      </div>
      <FormControlls
        id="description"
        label="الوصف"
        type="text"
        fullWidth
        style={{ marginTop: "20px" }}
        defaultValue={complexe?.description}
      />
      <FormButtons edit={true} />
    </Box>
  );
};

EditComplexes.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  complexe: PropTypes.object.isRequired,
};

export default EditComplexes;
