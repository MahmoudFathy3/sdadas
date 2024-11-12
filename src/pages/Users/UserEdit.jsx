import FormUser from "@components/forms/Users/FormUser";
import Loading from "@components/Housing-system/Loading/Loading";
import PathName from "@components/Housing-system/PathName/PathName";
import {
  fetchDetailsUser,
  fetchUsers,
  updateUser,
} from "@store/reducers/Users/UsersSlice";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

const UserEdit = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useOutletContext();

  const { detailsUser } = useSelector((state) => state.users);

  const onsubmitEdit = (data) => {
    dispatch(updateUser(data))
      .unwrap()
      .then(() => {
        dispatch(fetchDetailsUser(state?.userName));
        navigate("/users/list");
      });
  };

  return (
    <section>
      <Helmet>
        <title>{`${context} | Edit Users`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="تعديل" name="المستخدمين / " />

        {/* Form Edit User */}
        <FormUser onSubmit={onsubmitEdit} data={detailsUser} edit={true} />
      </div>
    </section>
  );
};

export default UserEdit;
