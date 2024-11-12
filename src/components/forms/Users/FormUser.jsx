import styles from "@styles/forms.module.css";
import PropTypes from "prop-types";
import {
  Autocomplete,
  Box,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import FormControlls from "@components/Housing-system/FormControlls/FormControlls";
import Select from "@components/Housing-system/Select/Select";
import { onReset } from "@utils/onReset";
import FormButtons from "@components/Housing-system/FormButtons/FormButtons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUnitByManagementID } from "@store/reducers/Units/UnitsSlice";
import { fetchRole } from "@store/reducers/Auth/RoleSlice";
import Status from "@components/Housing-system/Select/Shared/Status/Status";
import Complexe from "@components/Housing-system/Select/Shared/Complexe/Complexe";

const FormUser = ({ onSubmit, reset, data, edit, isLoading }) => {
  const [statusId, setStatusID] = useState("");
  const [unitsId, setUnitsID] = useState([]);
  const [rolesId, setRolesID] = useState("");
  const [complexeId, setComplexeID] = useState("");

  const dispatch = useDispatch();
  const { unitByManagementId } = useSelector((state) => state.units);
  const { Role } = useSelector((state) => state.role);

  useEffect(() => {
    complexeId &&
      dispatch(fetchUnitByManagementID({ managementId: complexeId }));
    dispatch(fetchRole(0));
  }, [dispatch, complexeId]);

  const handlerSubmitted = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data2 = Object.fromEntries(formData);

    let user = {
      Username: data2.Username || data.username,
      FullName: data2.FullName,
      PhoneNumber: data2.PhoneNumber,
      Status: statusId >= 0 ? statusId : data.status,
    };

    if (rolesId?.label || data2.Roles)
      user.Roles = [rolesId?.label || data2.Roles];
    if (complexeId) user.ManagmentId = complexeId;
    if (unitsId?.length > 0) user.UnitsId = unitsId;
    if (data2.Password) user.Password = data2.Password;
    if (data2.Image?.name) user.ImageFile = data2.Image;

    if (edit) user.id = data.id;

    onSubmit(user);
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
        <FormControlls
          id="Username"
          label="اسم المستخدم"
          type="text"
          fullWidth
          required={true}
          defaultValue={data?.username}
          disabled={edit ? true : false}
        />

        <FormControlls
          id="FullName"
          label="اسم بالكامل"
          type="text"
          fullWidth
          required={true}
          defaultValue={data?.fullName}
        />

        <FormControlls
          id="PhoneNumber"
          label="رقم الهاتف"
          type="number"
          fullWidth
          required={true}
          defaultValue={data?.phoneNumber}
        />

        {!edit && (
          <>
            <Complexe
              id="complexe"
              setState={setComplexeID}
              defaultValue={data?.complexe}
            />

            <FormControl sx={{ gap: 1, width: "100%" }}>
              <FormLabel htmlFor={"UnitId"}>الوحدة</FormLabel>
              <Autocomplete
                multiple
                disablePortal
                id={"UnitId"}
                options={
                  unitByManagementId?.data?.map((unit) => ({
                    id: unit.id,
                    label: unit.unitPrefix,
                  })) || []
                }
                filterSelectedOptions={true}
                renderOption={(props, option) => {
                  return (
                    <div {...props} key={option.id} data-value={option.id}>
                      <li> {option.label}</li>
                    </div>
                  );
                }}
                renderInput={(params) => (
                  <TextField id={"UnitId"} name={"UnitId"} {...params} />
                )}
                onChange={(e, v) =>
                  v?.map((unit) => {
                    if (unitsId.find((id) => unit.id === id)) return;
                    setUnitsID((prev) => [...prev, unit.id]);
                  })
                }
                defaultValue={data?.UnitId}
              />
            </FormControl>
          </>
        )}

        <Select
          id="Roles"
          label="الصلاحيات"
          options={Role?.map((role, index) => ({
            id: index,
            label: role,
          }))}
          required={false}
          defaultValue={data?.roles[0]}
          setState={setRolesID}
        />

        <FormControlls
          id="Password"
          label="كلمة السر"
          type="password"
          fullWidth
          required={edit ? false : true}
          defaultValue={data?.password}
        />

        <Status setStatusID={setStatusID} required={edit ? false : true} />

        <FormControlls
          id="Image"
          label="الصورة"
          type="file"
          fullWidth
          required={edit ? false : true}
          defaultValue={data?.image}
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

FormUser.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object,
  reset: PropTypes.bool,
  edit: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default FormUser;
