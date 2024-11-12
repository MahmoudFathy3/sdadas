import FormAds from "@components/forms/Ads/FormAds";
import PathName from "@components/Housing-system/PathName/PathName";
import { updateAds } from "@store/reducers/Ads/AdsSlice";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

const AdsEdit = () => {
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useOutletContext();

  const { state } = useLocation();

  const onSubmit = (data) => {
    dispatch(updateAds(data))
      .unwrap()
      .then(() => {
        setSuccess("تم اضافة الاعلان بنجاح");
        navigate("/ads/list");
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
        <title>{`${context} | Edit Ads`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="تعديل" name="الاعلانات / " />

        <FormAds onSubmit={onSubmit} ads={state} edit={true} />
      </div>
    </section>
  );
};

export default AdsEdit;
