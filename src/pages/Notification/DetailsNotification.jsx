import PathName from "@components/Housing-system/PathName/PathName";
import { fetchUsers } from "@store/reducers/Users/UsersSlice";
import styles from "@styles/Page.module.css";
import { CheckRoles } from "@utils/CheckRoles";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

const DetailsNotification = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers(0));
  }, [dispatch]);

  if (!CheckRoles("SuperAdmin")) {
    return <Navigate to={"*"} replace />;
  }

  return (
    <section>
      <Helmet>
        <title>{`${context} | Details Notification`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="عرض" name="الاشعار / " />

        <div className={styles.details_content}>
          <div className={styles.details_wapper}>
            <div className={styles.details_info}>
              <h3> اسم المستخدم :</h3>
              <span>
                {
                  users?.data?.find((user) => user.id === state.userId)
                    ?.fullName
                }
              </span>
            </div>
            <div className={styles.details_info}>
              <h3> عنوان الاشعار :</h3>
              <span>{state.title}</span>
            </div>
            <div className={styles.details_info}>
              <h3> الرسالة :</h3>
              <span>{state.message}</span>
            </div>
          </div>

          <button onClick={() => navigate(-1)}>عودة</button>
        </div>
      </div>
    </section>
  );
};

export default DetailsNotification;
