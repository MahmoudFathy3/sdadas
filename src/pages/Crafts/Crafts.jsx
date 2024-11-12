import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Success from "@components/feedback/Success/Success";
import PathName from "@components/Housing-system/PathName/PathName";
import FromCrafts from "@components/forms/Crafts/FromCrafts";
import { createCraft } from "@store/reducers/Crafts/CraftsSlice";
import { useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet";

const Crafts = () => {
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const context = useOutletContext();

  const onSubmit = (data) => {
    dispatch(createCraft(data))
      .unwrap()
      .then(() => {
        setSuccess("تم اضافة صنعة بنجاح");
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
        <title>{`${context} | Add Crafts`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="اضافة" name="صانعة / " />

        <Success message={success} />

        <FromCrafts onSubmit={onSubmit} reset={true} />
      </div>
    </section>
  );
};

export default Crafts;
