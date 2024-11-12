import { useEffect, useState } from "react";
import FormComplaints from "@components/forms/Complaints/FormComplaints";
import PathName from "@components/Housing-system/PathName/PathName";
import { updateComplaint } from "@store/reducers/Complaints/ComplaintsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useOutletContext } from "react-router-dom";
import Success from "@components/feedback/Success/Success";
import { Helmet } from "react-helmet";

const ComplaintEdit = () => {
  const [success, setSuccess] = useState("");

  const { state } = useLocation();
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { isLoading } = useSelector((state) => state.complaints);

  const onSubmit = (data) => {
    dispatch(updateComplaint(data))
      .unwrap()
      .then(() => {
        setSuccess("تم تعديل الشكوي بنجاح");
      });
  };

  console.log(state);

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
        <title>{`${context} | Edit Complaint`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="تعديل" name="الشكاوي / " />

        <Success message={success} />

        <FormComplaints
          onSubmit={onSubmit}
          complaint={state}
          edit={true}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
};

export default ComplaintEdit;
