import FormServices from "@components/forms/Services/FormServices";
import PathName from "@components/Housing-system/PathName/PathName";
import { updateService } from "@store/reducers/Service/ServiceSlice";
import { CheckRoles } from "@utils/CheckRoles";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate, useOutletContext } from "react-router-dom";

const ServicesEdit = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { isLoading } = useSelector((state) => state.services);

  const onsubmitEdit = (data) => {
    dispatch(updateService(data))
      .unwrap()
      .then(() => {
        navigate("/services/list");
      });
  };

    if (!CheckRoles("ManagementOwner")) {
      return <Navigate to={"*"} replace />;
    }


  return (
    <section>
      <Helmet>
        <title>{`${context} | Edit Services`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="تعديل" name="الخدمات / " />

        {/* Form Edit Services */}
        <FormServices
          onSubmit={onsubmitEdit}
          service={state}
          edit={true}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
};

export default ServicesEdit;
