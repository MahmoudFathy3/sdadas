import { useEffect } from "react";
import styles from "@styles/Page.module.css";
import PathName from "@components/Housing-system/PathName/PathName";
import { fetchBuildingForComplexe } from "@store/reducers/Building/BuildingSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import { CheckRoles } from "@utils/CheckRoles";

const UnitBuilding = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { state } = useLocation();

  const { buildForComplexe } = useSelector((state) => state.buildings);

  useEffect(() => {
    dispatch(fetchBuildingForComplexe(state.id));
  }, [dispatch, state]);

  if (!CheckRoles("SuperAdmin")) {
    return <Navigate to={"*"} replace />;
  }

  return (
    <section>
      <Helmet>
        <title>{`${context} | Unit Building `}</title>
      </Helmet>

      <PathName path="انشاء وحدة" name="" />

      {buildForComplexe?.data?.length < 1 && (
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            margin: "50px 0px",
            fontSize: "20px",
          }}
        >
          لا يوجد مباني في هذا المجمع
        </p>
      )}
      <div className={styles.Container_Card}>
        {buildForComplexe?.data?.length > 0 &&
          buildForComplexe?.data?.map((buildForComplexe) => (
            <div key={buildForComplexe.buildingId} className={styles.card}>
              <div className={styles.card_title}>
                <h3>اسم المجمع: </h3>
                <p>{buildForComplexe.managementName}</p>
              </div>
              <div className={styles.card_title}>
                <h3>اسم المبني: </h3>
                <p>{buildForComplexe.buildingName}</p>
              </div>
              <div className={styles.card_title}>
                <h3>رقم المبني: </h3>
                <p>{buildForComplexe.buildingPrefix}</p>
              </div>
              <div className={styles.card_title}>
                <h3> عدد ادوار المبني: </h3>
                <p>{buildForComplexe.totalFloor}</p>
              </div>
              <div className={styles.card_title}>
                <h3 style={{ fontSize: "16px" }}> عدد الوحدات لكل طابق: </h3>
                <p>{buildForComplexe.unitPerFloor}</p>
              </div>
              <button
                onClick={() =>
                  navigate(
                    `/units/management/${state.id}/buildings/${buildForComplexe.buildingId}`,
                    {
                      state: { managementId: state.id, buildForComplexe },
                    }
                  )
                }
              >
                انشاء الوحدات
              </button>
            </div>
          ))}
      </div>
    </section>
  );
};

export default UnitBuilding;
