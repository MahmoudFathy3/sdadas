import styles from "@styles/forms.module.css";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import Select from "@components/Housing-system/Select/Select";
import FormControlls from "@components/Housing-system/FormControlls/FormControlls";
import FormButtons from "@components/Housing-system/FormButtons/FormButtons";
import { onReset } from "@utils/onReset";
import { useState } from "react";
import UnitFurnishType from "@components/Housing-system/Select/Shared/Units/UnitFurnishType/UnitFurnishType";
import UnitRole from "@components/Housing-system/Select/Shared/Units/UnitRole/UnitRole";
import UnitType from "@components/Housing-system/Select/Shared/Units/UnitType/UnitType";
import UnitStatus from "@components/Housing-system/Select/Shared/Units/UnitStatus/UnitStatus";
import BuildingForComplexe from "@components/Housing-system/Select/Shared/Building/BuildingForComplexe";
import Complexe from "@components/Housing-system/Select/Shared/Complexe/Complexe";

const AddUnits = ({ onSubmit, data, reset, edit, isLoading }) => {
  const [building_id, setBuildingId] = useState("");
  const [complexe_id, setComplexeId] = useState(data?.buildingId || "");
  const [unitType_id, setUnitTypeId] = useState("");
  const [unitRole_id, setUnitRoleId] = useState("");
  const [unitStatus_id, setUnitStatusId] = useState("");
  const [unitTenantRole_id, setUnitTenantRole] = useState("");

  const handlerSumbit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data2 = Object.fromEntries(formData);

    let Units = {
      unitPrefix: data2.unitPrefix,
      unitNumber: data2.unitNumber,
      unitPrice: data2.unitPrice,
      numberOfBedRoom: Number(data2.numberOfBedRoom),
      numberOfBathroom: Number(data2.numberOfBedRoom),
      unitSoldDate: `${
        data2.unitSoldDate
      }T${new Date().getHours()}:${new Date().getMinutes()}`,
      unitType: unitType_id || data.unitPrice,
      unitRole: unitRole_id || data.unitRole,
      unitStatus: unitStatus_id || data.unitStatus,
      unitTenantRole: unitTenantRole_id || data.unitTenantRole,
      buildingId: building_id || data.buildingId,
      managmentId: complexe_id || data.managmentId,
    };

    if (edit) Units.id = data.id;

    onSubmit(Units);
    onReset(event.currentTarget.reset());
  };

  return (
    <Box component={"form"} onSubmit={handlerSumbit} className={styles.form}>
      <div className={styles.form_wapper}>
        <Complexe
          id="managmentId"
          label="اسم المجمع"
          setState={setComplexeId}
          defaultValue={data?.buildingId}
        />

        <BuildingForComplexe
          id="unitPrefix"
          label="اسم المبني"
          complexe_id={complexe_id}
          defaultValue={data?.buildingId}
          setState={setBuildingId}
        />
        <FormControlls
          id="unitNumber"
          label="رقم الوحدة"
          type="number"
          fullWidth
          required={true}
          defaultValue={data?.unitNumber}
        />
        <UnitType setStateID={setUnitTypeId} defaultValue={data?.unitType} />
        <UnitRole
          id={"unitRole"}
          label="دور الوحدة"
          setStateID={setUnitRoleId}
          defaultValue={data?.unitRole}
        />
        <FormControlls
          id="numberOfBedRoom"
          label="عدد الغرف"
          type="number"
          fullWidth
          required={true}
          defaultValue={data?.numberOfBedRoom}
        />
        <FormControlls
          id="numberOfBathroom"
          label="عدد الحمامات"
          type="number"
          fullWidth
          required={true}
          defaultValue={data?.numberOfBathroom}
        />
        <UnitRole
          id={"unitTenantRole"}
          label="unit Tenant Role"
          setStateID={setUnitRoleId}
          defaultValue={data?.unitTenantRole}
        />
        <UnitStatus
          setStateID={setUnitStatusId}
          defaultValue={data?.unitStatus}
        />
        <UnitFurnishType
          setStateID={setUnitTenantRole}
          defaultValue={data?.unitTenantRole}
        />
        <FormControlls
          id="unitPrice"
          label="سعر الوحدة"
          type="number"
          fullWidth
          required={true}
          defaultValue={data?.unitPrice}
        />
        <FormControlls
          id="unitSoldDate"
          label="تاريخ البيع"
          type="date"
          fullWidth
          required={true}
          defaultValue={data.unitSoldDate.slice(0, 10)}
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

AddUnits.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object,
  reset: PropTypes.bool,
  edit: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default AddUnits;
