import Error from "@components/feedback/Error/Error";
import Success from "@components/feedback/Success/Success";
import FormUser from "@components/forms/Users/FormUser";
import PathName from "@components/Housing-system/PathName/PathName";
import { ClearError, createUser } from "@store/reducers/Users/UsersSlice";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

const Users = () => {
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();
  const context = useOutletContext();

  const { isLoading, error } = useSelector((state) => state.users);

  const onSubmit = (data) => {
    dispatch(createUser(data))
      .unwrap()
      .then(() => {
        setSuccess("Successfully");
      });
  };

  // show success
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }

    // clear error message
    if (error?.message) {
      setTimeout(() => {
        dispatch(ClearError());
      }, 3000);
    }
  }, [success, error, dispatch]);

  return (
    <section>
      <Helmet>
        <title>{`${context} | Add Users`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="اضافة" name="المستخدمين / " />

        <Success message={success} />

        <Error message={error?.message} />

        <FormUser onSubmit={onSubmit} reset={true} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default Users;
