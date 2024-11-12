import styles from "@styles/forms.module.css";
import PropTypes from "prop-types";
import { Box, FormControl, FormLabel, TextField } from "@mui/material";
import Select from "@components/Housing-system/Select/Select";
import FormControlls from "@components/Housing-system/FormControlls/FormControlls";
import FormButtons from "@components/Housing-system/FormButtons/FormButtons";
import { onReset } from "@utils/onReset";
import Status from "@components/Housing-system/Select/Shared/Status/Status";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUsers } from "@store/reducers/Users/UsersSlice";

const FormComplaints = ({ onSubmit, complaint, reset, edit, isLoading }) => {
  const [userName, setUserName] = useState("");
  const [complaintDocs_imgs, seComplaintDocsImgs] = useState([]);
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers(0));
  }, [dispatch]);

  // useEffect(() => {
  //   if (complaint?.complaintDocs) {
  //     seComplaintDocsImgs((prev) => [
  //       ...prev,
  //       complaint?.complaintDocs.map((doc) => doc.mediaUrl),
  //     ]);
  //   }
  // }, [complaint]);

  // console.log(complaintDocs_imgs);

  const handlerSubmitted = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    let complaints = {
      fileName: data.fileName,
      subject: data.subject,
      file: data.file,
      status: data.status,
      message: data.message,
    };

    if (edit) complaints.id = complaint.id;

    console.log(complaints);

    onSubmit(complaints);
    onReset(e.currentTarget.reset());
  };

  useEffect(() => {
    if (users?.data?.length > 0) {
      setUserName(
        users?.data?.find((user) => user.id == complaint?.userId)?.fullName ||
          ""
      );
    }
  }, [users, complaint]);

  return (
    <Box component={"form"} onSubmit={handlerSubmitted} className={styles.form}>
      <div className={styles.form_wapper}>
        <FormControlls
          id="fileName"
          label="اسم المستخدم"
          type="text"
          fullWidth
          required={true}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <FormControlls
          id="subject"
          label="عنوان الشياكة"
          type="text"
          fullWidth
          required={true}
          defaultValue={complaint?.subject}
        />
        <Status
          id="status"
          label="حالة الشكاوي"
          defaultValue={complaint?.status}
        />
      </div>
      <div className={styles.Complaints}>
        <FormControlls
          id="file"
          label="الصورة"
          type="file"
          fullWidth
          required={edit ? false : true}
        />
        <FormControl sx={{ gap: 1, width: "100%" }}>
          <FormLabel htmlFor="message">
            الشكوي<span style={{ color: "red" }}>*</span>
          </FormLabel>
          <textarea
            id="message"
            name="message"
            required
            defaultValue={complaint?.message}
          ></textarea>
        </FormControl>
      </div>
      <FormButtons
        onReset={reset && onReset}
        edit={edit}
        isLoading={isLoading}
      />
    </Box>
  );
};

FormComplaints.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  complaint: PropTypes.object,
  reset: PropTypes.bool,
  edit: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default FormComplaints;
