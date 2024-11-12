import Success from "@components/feedback/Success/Success";
import FormNotification from "@components/forms/Notification/FormNotification";
import PathName from "@components/Housing-system/PathName/PathName";
import { createNotification } from "@store/reducers/Notification/NotificationSlice";
import { CheckRoles } from "@utils/CheckRoles";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useOutletContext } from "react-router-dom";

const Notification = () => {
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { loading } = useSelector((state) => state.notification);

  const onSubmit = (data) => {
    dispatch(createNotification(data))
      .unwrap()
      .then(() => {
        setSuccess("تم اضافة اشعار بنجاح");
      });
  };

  if (!CheckRoles("SuperAdmin")) {
    return <Navigate to={"*"} replace />;
  }

  return (
    <section>
      <Helmet>
        <title>{`${context} | Add Notification`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="اضافة" name="الاشعارات / " />

        <Success message={success} />

        <FormNotification
          onSubmit={onSubmit}
          reset={true}
          isLoading={loading}
        />
      </div>
    </section>
  );
};

export default Notification;
