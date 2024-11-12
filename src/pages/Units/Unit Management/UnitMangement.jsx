import styles from "@styles/Page.module.css";
import PathName from "@components/Housing-system/PathName/PathName";
import { fetchComplexeUser } from "@store/reducers/Complexes/ComplexeSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet";
import { CheckRoles } from "@utils/CheckRoles";

const UnitManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { complexesUser } = useSelector((state) => state.complexes);

  useEffect(() => {
    dispatch(fetchComplexeUser());
  }, [dispatch]);

  if (!CheckRoles("SuperAdmin")) {
    return <Navigate to={"*"} replace />;
  }

  return (
    <section>
      <Helmet>
        <title>{`${context} | Unit Complexes `}</title>
      </Helmet>

      <PathName path="انشاء وحدة" name="" />

      {complexesUser?.data?.length < 1 && (
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            margin: "50px 0px",
            fontSize: "20px",
          }}
        >
          لا يوجد مجمعات
        </p>
      )}
      <div className={styles.Container_Card}>
        {complexesUser?.data?.length > 0 &&
          complexesUser?.data?.map((complexe) => (
            <div key={complexe.id} className={styles.card}>
              <div className={styles.card_title}>
                <h3>اسم المجمع: </h3>
                <p>{complexe.name}</p>
              </div>
              <div className={styles.card_title}>
                <h3 style={{ fontSize: "16px" }}> عدد المباني: </h3>
                <p>{complexe.numberOfBuildings}</p>
              </div>
              <button
                onClick={() =>
                  navigate(`/units/management/${complexe.id}/buildings`, {
                    state: { id: complexe.id },
                  })
                }
              >
                عرض المباني
              </button>
            </div>
          ))}
      </div>
    </section>
  );
};

export default UnitManagement;
