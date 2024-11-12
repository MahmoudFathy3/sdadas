import Success from "@components/feedback/Success/Success";
import FormAds from "@components/forms/Ads/FormAds";
import PathName from "@components/Housing-system/PathName/PathName";
import { createAds } from "@store/reducers/Ads/AdsSlice";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";

const Ads = () => {
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const context = useOutletContext();

  const onSubmit = (data) => {
    dispatch(createAds(data))
      .unwrap()
      .then(() => {
        setSuccess("تم اضافة الاعلان بنجاح");
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
        <title>{`${context} | Add Ads`}</title>
      </Helmet>
      
      <div className="section_content">
        <PathName path="اضافة" name="الاعلانات / " />

        <Success message={success} />

        <FormAds onSubmit={onSubmit} reset={true} />
      </div>
    </section>
  );
};

export default Ads;
