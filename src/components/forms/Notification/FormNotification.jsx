import styles from "@styles/forms.module.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Autocomplete,
  Box,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import FormControlls from "@components/Housing-system/FormControlls/FormControlls";
import FormButtons from "@components/Housing-system/FormButtons/FormButtons";
import { onReset } from "@utils/onReset";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@store/reducers/Users/UsersSlice";

const FormNotification = ({ onSubmit, reset, data, edit, isLoading }) => {
  const [usersId, setUsersId] = useState([]);

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    !edit && dispatch(fetchUsers(0));
  }, [dispatch, edit]);

  const handlerSubmitted = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const notifications = {
      title: formData.get("title"),
      message: formData.get("message"),
      usersId: usersId,
    };

    onSubmit(notifications);
    e.currentTarget.reset();
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
          id="title"
          label="عنوان الاشعار"
          type="text"
          fullWidth
          required={true}
          defaultValue={data?.title}
        />

        <FormControl sx={{ gap: 1, width: "100%" }}>
          <FormLabel htmlFor={"usersId"}>المستخدمين</FormLabel>
          <Autocomplete
            multiple
            disablePortal
            id={"usersId"}
            options={
              users?.data?.map((user) => ({
                id: user.id,
                label: user.fullName,
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
              <TextField id={"usersId"} name={"usersId"} {...params} />
            )}
            onChange={(e, v) =>
              v?.map((user) => {
                if (usersId.find((id) => user.id === id)) return;
                user.id && setUsersId((prev) => [...prev, user.id]);
              })
            }
            defaultValue={data?.userId}
          />
        </FormControl>

        <FormControlls
          id="message"
          label="المحتوي"
          type="text"
          fullWidth
          required={true}
          defaultValue={data?.message}
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

FormNotification.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  reset: PropTypes.bool,
  data: PropTypes.object,
  edit: PropTypes.bool,
  isLoading: PropTypes.bool,
};
export default FormNotification;
