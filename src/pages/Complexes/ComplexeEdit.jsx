import EditComplexes from "@components/forms/Complexes/EditComplexes";
import PathName from "@components/Housing-system/PathName/PathName";
import { updateComplexe } from "@store/reducers/Complexes/ComplexeSlice";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

const ComplexeEdit = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useOutletContext();

  const onSubmit = (data) => {
    dispatch(updateComplexe(data))
      .unwrap()
      .then(() => {
        navigate("/complexes/list");
      });
  };

  return (
    <section>
      <Helmet>
        <title>{`${context} | Edit Complexes`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="تعديل" name="التجمعات / " />

        {/* Form Edit Complexe */}
        <EditComplexes onSubmit={onSubmit} complexe={state} />
      </div>
    </section>
  );
};

export default ComplexeEdit;
