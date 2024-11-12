import styles from "@styles/forms.module.css";
import { Box } from "@mui/material";
import FormControlls from "@components/Housing-system/FormControlls/FormControlls";
import PathName from "@components/Housing-system/PathName/PathName";
import { useDispatch } from "react-redux";
import { updateGovernorate } from "@store/reducers/Governorate/GovernorateSlice";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet";

const GovernorateEdit = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useOutletContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    dispatch(
      updateGovernorate({ id: state?.item?.id, name: formData.get("name") })
    )
      .unwrap()
      .then(() => {
        navigate("/governorate/list");
      });

    e.currentTarget.reset();
  };

  return (
    <section>
      <Helmet>
        <title>{`${context} | Edit Governorate`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="تعديل" name="المحافظة / " />

        <Box component={"form"} onSubmit={onSubmit} className={styles.form}>
          <FormControlls
            type="text"
            id="name"
            label="المحافظة"
            required={true}
            defaultValue={state?.item?.name}
          />
          <div className={styles.form_buttons}>
            <button type="submit">اضافة</button>
            <button type="button" onClick={() => navigate("/governorate/list")}>
              الالغاء
            </button>
          </div>
        </Box>
      </div>
    </section>
  );
};

export default GovernorateEdit;
