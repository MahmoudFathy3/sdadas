import { useEffect, useState } from "react";
import styles from "@styles/forms.module.css";
import { Box } from "@mui/material";
import FormControlls from "@components/Housing-system/FormControlls/FormControlls";
import PathName from "@components/Housing-system/PathName/PathName";
import { onReset } from "@utils/onReset";
import { useDispatch } from "react-redux";
import { createGovernorate } from "@store/reducers/Governorate/GovernorateSlice";
import Success from "@components/feedback/Success/Success";
import { Helmet } from "react-helmet";
import { useOutletContext } from "react-router-dom";

const Governorate = () => {
  const [messageSuccuss, setMessageSuccuss] = useState("");

  const dispatch = useDispatch();
  const context = useOutletContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    dispatch(createGovernorate(data))
      .unwrap()
      .then(() => {
        setMessageSuccuss("تمت الاضافه بنجاح");
      });

    onReset(e.currentTarget.reset());
  };

  useEffect(() => {
    if (messageSuccuss) {
      setTimeout(() => {
        setMessageSuccuss("");
      }, 3000);
    }
  }, [messageSuccuss]);

  return (
    <section>
      <Helmet>
        <title>{`${context} | Add Governorate`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="اضافة" name="المحافظة / " />

        <Success message={messageSuccuss} />

        <Box component={"form"} onSubmit={onSubmit} className={styles.form}>
          <FormControlls
            type="text"
            id="name"
            label="المحافظة"
            required={true}
          />
          <div className={styles.form_buttons}>
            <button type="submit">اضافة</button>
            <button type="reset" onClick={onReset}>
              الالغاء
            </button>
          </div>
        </Box>
      </div>
    </section>
  );
};

export default Governorate;
