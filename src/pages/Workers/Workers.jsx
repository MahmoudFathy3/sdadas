import { useEffect, useState } from "react";
import PathName from "@components/Housing-system/PathName/PathName";
import { useDispatch, useSelector } from "react-redux";
import Success from "@components/feedback/Success/Success";
import FormWorkers from "@components/forms/Workers/FormWorkers";
import {
  clearError,
  createWorkers,
} from "@store/reducers/Workers/WorkersSlice";
import Error from "@components/feedback/Error/Error";
import { useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet";

const Workers = () => {
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { error, loading } = useSelector((state) => state.workers);

  const onSubmit = (data) => {
    dispatch(createWorkers(data))
      .unwrap()
      .then(() => {
        setSuccess("تم اضافة عامل بنجاح");
      });
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }

    if (error?.message) {
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [success, error, dispatch]);

  return (
    <section>
      <Helmet>
        <title>{`${context} | Add Workers`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="اضافة" name="العمال / " />

        <Success message={success} />
        <Error message={error?.message} />

        <FormWorkers onSubmit={onSubmit} reset={true} isLoading={loading} />
      </div>
    </section>
  );
};

export default Workers;
