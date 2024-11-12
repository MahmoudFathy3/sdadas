import PathName from "@components/Housing-system/PathName/PathName";
import styles from "@styles/Page.module.css";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

const DetailsUser = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const context = useOutletContext();

  return (
    <section>
      <Helmet>
        <title>{`${context} | Details Users`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="عرض" name="المستخدمين / " />

        <div className={styles.details_content}>
          <div className={styles.details_wapper}>
            <div className={styles.details_info}>
              <h3>اسم المستخدم :</h3>
              <span>{state.fullName}</span>
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

export default DetailsUser;
