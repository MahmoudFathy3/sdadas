import Error from "@components/feedback/Error/Error";
import FormBuildings from "@components/forms/Buildings/FormBuildings";
import PathName from "@components/Housing-system/PathName/PathName";
import {
  fetchBuildings,
  updateBuilding,
} from "@store/reducers/Building/BuildingSlice";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

const BuildingEdit = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useOutletContext();

  const { isLoading, error } = useSelector((state) => state.buildings);

  const onSubmit = (data) => {
    dispatch(updateBuilding(data))
      .unwrap()
      .then(() => {
        dispatch(fetchBuildings());
        navigate("/buildings/list");
      });
  };

  return (
    <section>
      <Helmet>
        <title>{`${context} | Edit Buildings`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="تعديل" name="المباني / " />

        <Error message={error?.message} />

        <FormBuildings
          onSubmit={onSubmit}
          build={state}
          edit={true}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
};

export default BuildingEdit;
