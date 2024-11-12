import Error from "@components/feedback/Error/Error";
import FormWorkers from "@components/forms/Workers/FormWorkers";
import PathName from "@components/Housing-system/PathName/PathName";
import { updateWorkers } from "@store/reducers/Workers/WorkersSlice";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

const WorkersEdit = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useOutletContext();

  const { error, loading } = useSelector((state) => state.workers);

  const onSubmit = (data) => {
    dispatch(updateWorkers(data))
      .unwrap()
      .then(() => {
        navigate("/workers/list");
      });
  };

  return (
    <section>
      <Helmet>
        <title>{`${context} | Edit Workers`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="تعديل" name="العمال / " />

        <Error message={error?.message} />

        <FormWorkers
          onSubmit={onSubmit}
          edit={true}
          workers={state}
          isLoading={loading}
        />
      </div>
    </section>
  );
};

export default WorkersEdit;
