import Success from "@components/feedback/Success/Success";
import AddUnits from "@components/forms/Units/AddUnits";
import PathName from "@components/Housing-system/PathName/PathName";
import { createUnit } from "@store/reducers/Units/UnitsSlice";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

const Units = () => {
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();
  const context = useOutletContext();

  const { isLoading } = useSelector((state) => state.units);

  const onSubmit = (data) => {
    dispatch(createUnit(data))
      .unwrap()
      .then(() => {
        setSuccess("تم اضافة وحدة بنجاح");
      });
  };

  return (
    <section>
      <Helmet>
        <title>{`${context} | Add Units`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="اضافة" name="الوحدات / " />

        <Success message={success} />

        <AddUnits onSubmit={onSubmit} reset={true} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default Units;
