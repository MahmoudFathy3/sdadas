import { useEffect, useState } from "react";
import Success from "@components/feedback/Success/Success";
import FormImages from "@components/forms/Images/FormImages";
import PathName from "@components/Housing-system/PathName/PathName";
import { clearError, createImage } from "@store/reducers/Image/ImageSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet";
import { CheckRoles } from "@utils/CheckRoles";

const Images = () => {
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { error, isLoading } = useSelector((state) => state.images);

  const onSubmit = (data) => {
    dispatch(createImage(data))
      .unwrap()
      .then(() => {
        setSuccess("تم اضافة بنجاح");
      });
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }

    if (error?.errors) {
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [success, error, dispatch]);

  if (!CheckRoles("ManagementOwner")) {
    return <Navigate to={"*"} replace />;
  }

  return (
    <section>
      <Helmet>
        <title>{`${context} | Add Images`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="اضافة" name="الصور / " />

        {error?.errors && (
          <div>
            {error?.errors?.ImageUrl?.map((error, index) => (
              <p key={index} className="error">
                {error}
              </p>
            ))}
          </div>
        )}

        <Success message={success} />

        <FormImages onSubmit={onSubmit} reset={true} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default Images;
