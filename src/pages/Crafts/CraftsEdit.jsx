import FromCrafts from "@components/forms/Crafts/FromCrafts";
import PathName from "@components/Housing-system/PathName/PathName";
import { updateCraft } from "@store/reducers/Crafts/CraftsSlice";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

const CraftsEdit = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useOutletContext();

  const onSubmit = (data) => {
    dispatch(updateCraft(data))
      .unwrap()
      .then(() => {
        navigate("/craft/list");
      });
  };

  return (
    <section>
      <Helmet>
        <title>{`${context} | Edit Crafts`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="تعديل" name="صانعة / " />

        <FromCrafts onSubmit={onSubmit} data={state} edit={true} />
      </div>
    </section>
  );
};

export default CraftsEdit;
