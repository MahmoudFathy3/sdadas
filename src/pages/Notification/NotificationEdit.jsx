import FormNotification from "@components/forms/Notification/FormNotification";
import Loading from "@components/Housing-system/Loading/Loading";
import PathName from "@components/Housing-system/PathName/PathName";
import { updateNotification } from "@store/reducers/Notification/NotificationSlice";
import { fetchUsers } from "@store/reducers/Users/UsersSlice";
import { CheckRoles } from "@utils/CheckRoles";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

const NotificationEdit = () => {
  const [data, setData] = useState(null);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useOutletContext();

  const { loading } = useSelector((state) => state.notification);
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers(0));
  }, [dispatch]);

  const onSubmit = (user) => {
    let Users = {
      id: state.id,
      title: user.title,
      message: user.message,
    };

    user?.usersId?.length > 0
      ? (Users.userId = user.usersId)
      : (Users.userId = [state.userId]);

    dispatch(updateNotification(Users))
      .unwrap()
      .then(() => {
        navigate("/notifications/list");
        setData(null);
      });
  };

  useEffect(() => {
    if (state && users?.data?.length > 0) {
      setData({
        title: state.title,
        message: state.message,
        isPaid: state.isPaid,
        isRead: state.isRead,
        isServices: state.isServices,
        userId: [
          {
            id: state.userId,
            label: users?.data?.find((user) => user.id === state.userId)
              ?.fullName,
          },
        ],
      });
    }
  }, [state, users]);

  if (!CheckRoles("SuperAdmin")) {
    return <Navigate to={"*"} replace />;
  }

  return (
    <section>
      <Helmet>
        <title>{`${context} | Edit Notification`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="تعديل" name="الاشعار / " />

        {data ? (
          <FormNotification
            onSubmit={onSubmit}
            data={data}
            edit={true}
            isLoading={loading}
          />
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0px" }}>
            <Loading color="#333" />
          </div>
        )}
      </div>
    </section>
  );
};

export default NotificationEdit;
