import styles from "@styles/Page.module.css";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import PathName from "@components/Housing-system/PathName/PathName";
import { Helmet } from "react-helmet";

const DetailsBuilding = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const context = useOutletContext();

  return (
    <section>
      <Helmet>
        <title>{`${context} | Details Buildings`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="عرض" name="المباني / " />

        <div className={styles.details_content}>
          <div className={styles.details_wapper}>
            <div className={styles.details_info}>
              <h3>اسم المجمع :</h3>
              <span>{state.managementId}</span>
            </div>
            <div className={styles.details_info}>
              <h3>اسم المبني :</h3>
              <span>{state.name}</span>
            </div>
            <div className={styles.details_info}>
              <h3> رقم المبني :</h3>
              <span>{state.buildingPrefix}</span>
            </div>
            <div className={styles.details_info}>
              <h3> عدد الطوابق :</h3>
              <span>{state.totalFloor}</span>
            </div>
            <div className={styles.details_info}>
              <h3> عدد الوحدات لكل طابق :</h3>
              <span>{state.unitPerFloor}</span>
            </div>
            <div className={styles.details_info}>
              <h3> الوصف :</h3>
              <span>{state.description}</span>
            </div>
            <div className={styles.details_info}>
              <h3> الحالة :</h3>
              <span>
                {state.status === 0 && "بدون قيمة"}
                {state.status === 1 && "فعال"}
                {state.status === 2 && "موقوف"}
              </span>
            </div>
          </div>

          <button onClick={() => navigate(-1)}>عودة</button>
        </div>
      </div>
    </section>
  );
};

export default DetailsBuilding;
