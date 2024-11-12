import { useEffect, useState } from "react";
import styles from "@styles/forms.module.css";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import Complexe from "@components/Housing-system/Select/Shared/Complexe/Complexe";
import Select from "@components/Housing-system/Select/Select";
import FormControlls from "@components/Housing-system/FormControlls/FormControlls";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@store/reducers/Users/UsersSlice";
import { fetchCrafts } from "@store/reducers/Crafts/CraftsSlice";
import FormButtons from "@components/Housing-system/FormButtons/FormButtons";
import { onReset } from "@utils/onReset";

const FormWorkers = ({ onSubmit, workers, reset, edit, isLoading }) => {
  const [ManagementId, setManagementId] = useState(
    workers?.work?.managementId || ""
  );
  const [userId, setUserId] = useState("");
  const [workId, setWorkId] = useState("");

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { crafts } = useSelector((state) => state.crafts);

  useEffect(() => {
    dispatch(fetchUsers(0));
    ManagementId &&
      dispatch(fetchCrafts({ managementId: ManagementId, page: 0 }));
  }, [dispatch, ManagementId]);

  const handlerSubmitted = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    let Work = {
      userId: userId.id || workers.userId,
      workId: workId.id || workers.work.id,
      minute: Number(formData.get("minute")),
    };

    if (edit) Work.id = workers.id;

    onSubmit(Work);
    event.currentTarget.reset();
  };


  return (
    <Box component={"form"} onSubmit={handlerSubmitted} className={styles.form}>
      <div className={styles.form_wapper}>
        <Complexe
          id="ManagementId"
          label="اسم المجمع"
          setState={setManagementId}
          defaultValue={workers?.work?.managementId}
        />

        <Select
          id="workId"
          label="اسم الخدمة"
          options={
            crafts?.data?.map((carft) => ({
              id: carft.id,
              label: carft.name,
            })) || []
          }
          setState={setWorkId}
          defaultValue={workers?.work?.name}
        />
        <Select
          id="userId"
          label="اسم المستخدم"
          options={
            users?.data?.map((user) => ({
              id: user.id,
              label: user.fullName,
            })) || []
          }
          setState={setUserId}
          defaultValue={
            users?.data?.find((user) => user.id === workers?.userId)?.fullName
          }
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <FormControlls
            id="minute"
            label="الوقت المستغرق لكل عميل"
            type="number"
            required={true}
            defaultValue={workers?.minute}
          />
          <span style={{ color: "#666", fontSize: "14px" }}>بالدقائق</span>
        </div>
      </div>

      <FormButtons
        onReset={reset && onReset}
        edit={edit}
        isLoading={isLoading}
      />
    </Box>
  );
};

FormWorkers.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  workers: PropTypes.object,
  reset: PropTypes.bool,
  edit: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default FormWorkers;
