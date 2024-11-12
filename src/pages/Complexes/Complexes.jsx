import styles from "@styles/forms.module.css";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AddComplexes from "@components/forms/Complexes/AddComplexes";
import FormControlls from "@components/Housing-system/FormControlls/FormControlls";
import Modals from "@components/Housing-system/Modals/Modals";
import PathName from "@components/Housing-system/PathName/PathName";
import { useDispatch, useSelector } from "react-redux";
import { createComplexe } from "@store/reducers/Complexes/ComplexeSlice";
import {
  createGovernorate,
  fetchGovernorates,
} from "@store/reducers/Governorate/GovernorateSlice";
import Success from "@components/feedback/Success/Success";
import { useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet";

const Complexes = () => {
  const [success, setSuccess] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const context = useOutletContext();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.complexes);

  //  Add new state
  const onSubmitModal = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    dispatch(createGovernorate(data))
      .unwrap()
      .then(() => {
        dispatch(fetchGovernorates(0));
        setOpenModal(false);
      });
  };

  // Add new complexe
  const onSubmit = (data) => {
    dispatch(createComplexe(data))
      .unwrap()
      .then(() => {
        setSuccess("تم اضافة مجمع بنجاح");
      });
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }
  }, [success]);

  return (
    <section>
      <Helmet>
        <title>{`${context} | Add Complexes`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="اضافة" name="التجمعات / " />

        <Success message={success} />

        {/* Modal Add Grogovernorate */}
        <Modals
          open={openModal}
          handleClose={() => setOpenModal(false)}
          width="800px"
        >
          <Box
            component={"form"}
            onSubmit={onSubmitModal}
            className={styles.form}
          >
            <FormControlls
              type="text"
              id="name"
              label="المحافظة"
              required={true}
            />
            <div className={styles.form_buttons}>
              <button type="onSubmit">اضافة</button>
              <button type="button" onClick={() => setOpenModal(false)}>
                الالغاء
              </button>
            </div>
          </Box>
        </Modals>

        <AddComplexes
          onSubmit={onSubmit}
          openModal={() => setOpenModal(true)}
          Add={true}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
};

export default Complexes;
