import AddUnits from "@components/forms/Units/AddUnits";
import PathName from "@components/Housing-system/PathName/PathName";
import { UpdateUnit } from "@store/reducers/Units/UnitsSlice";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

const UnitsEdit = () => {
  const { state } = useLocation();
  const context = useOutletContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.units);

  const onSubmit = (data) => {
    dispatch(UpdateUnit(data))
      .unwrap()
      .then(() => {
        navigate("/units/list");
      });
  };

  return (
    <section>
      <Helmet>
        <title>{`${context} | Edit Units`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="تعديل" name="الوحدات / " />

        <AddUnits
          onSubmit={onSubmit}
          data={state}
          edit={true}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
};

export default UnitsEdit;
