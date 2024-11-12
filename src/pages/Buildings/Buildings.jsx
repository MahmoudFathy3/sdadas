import Success from "@components/feedback/Success/Success";
import FormBuildings from "@components/forms/Buildings/FormBuildings";
import PathName from "@components/Housing-system/PathName/PathName";
import { createBuilding } from "@store/reducers/Building/BuildingSlice";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

const Buildings = () => {
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { isLoading } = useSelector((state) => state.buildings);

  const onSubmit = (data) => {
    dispatch(createBuilding(data))
      .unwrap()
      .then(() => {
        setSuccess("Building created successfully");
      });
  };

  // hide message success
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
        <title>{`${context} | Add Buildings`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="اضافة" name="المباني / " />

        <Success message={success} />

        <FormBuildings onSubmit={onSubmit} reset={true} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default Buildings;
