import FormImages from "@components/forms/Images/FormImages";
import PathName from "@components/Housing-system/PathName/PathName";
import { CheckRoles } from "@utils/CheckRoles";
import { Helmet } from "react-helmet";
import { Navigate, useLocation, useOutletContext } from "react-router-dom";

const ImageEdit = () => {
  const { state } = useLocation();

  const context = useOutletContext();

  const onSubmit = (data) => {
    console.log(data);
  };

  if (!CheckRoles("ManagementOwner")) {
    return <Navigate to={"*"} replace />;
  }

  return (
    <section>
      <Helmet>
        <title>{`${context} | Edit Images`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="تعديل" name="الصور / " />

        <FormImages onSubmit={onSubmit} data={state} edit={true} />
      </div>
    </section>
  );
};

export default ImageEdit;
