import { useEffect } from "react";
import styles from "@styles/Page.module.css";
import PathName from "@components/Housing-system/PathName/PathName";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchComplexes } from "@store/reducers/Complexes/ComplexeSlice";
import { CheckRoles } from "@utils/CheckRoles";

const DetailsService = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { complexes } = useSelector((state) => state.complexes);

  useEffect(() => {
    dispatch(fetchComplexes());
  }, [dispatch]);

  if (!CheckRoles("ManagementOwner")) {
    return <Navigate to={"*"} replace />;
  }

  return (
    <section>
      <div className="section_content">
        <PathName path="عرض" name="الخدمة / " />

        <div className={styles.details_content}>
          <div className={styles.details_wapper}>
            <div className={styles.details_info}>
              <h3>اسم الخدمة :</h3>
              <span>{state.name}</span>
            </div>
            <div className={styles.details_info}>
              <h3> الوصف :</h3>
              <span>{state.description}</span>
            </div>
            <div className={styles.details_info}>
              <h3>اسم المستخدم :</h3>
              <span>
                {
                  complexes?.data?.find(
                    (complexe) => complexe.id === state.managementId
                  ).name
                }
              </span>
            </div>
            <div className={styles.details_info}>
              <h3> السعر :</h3>
              <span>{state.price}</span>
            </div>
            <div className={styles.details_info}>
              <h3>الحالة :</h3>
              <span>{state.isActive ? "نشاط" : "غير نشاط"}</span>
            </div>
          </div>

          <button onClick={() => navigate(-1)}>عودة</button>
        </div>
      </div>
    </section>
  );
};

export default DetailsService;
