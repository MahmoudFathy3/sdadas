import Success from "@components/feedback/Success/Success";
import FormServices from "@components/forms/Services/FormServices";
import PathName from "@components/Housing-system/PathName/PathName";
import { createService } from "@store/reducers/Service/ServiceSlice";
import { CheckRoles } from "@utils/CheckRoles";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useOutletContext } from "react-router-dom";

const Services = () => {
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { isLoading } = useSelector((state) => state.services);

  const onSubmit = (data) => {
    dispatch(createService(data))
      .unwrap()
      .then(() => {
        setSuccess("تم الاضافة بنجاح");
      });
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }
  }, [success]);

  if (!CheckRoles("ManagementOwner")) {
    return <Navigate to={"*"} replace />;
  }
  
  return (
    <section>
      <Helmet>
        <title>{`${context} | Add Services`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="اضافة" name="الخدمات / " />

        <Success message={success} />

        <FormServices onSubmit={onSubmit} reset={true} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default Services;
