import PathName from "@components/Housing-system/PathName/PathName";
import styles from "@styles/Page.module.css";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

const DetailsUnit = () => {
  const [unitStatus, setUnitStatus] = useState([
    { id: 0, label: "USNull" },
    { id: 1, label: "Sold" },
    { id: 2, label: "UnSold" },
    { id: 3, label: "Defective" },
    { id: 4, label: "Rejected" },
    { id: 5, label: "LoanRejected" },
    { id: 6, label: "Requested" },
  ]);

  const { state } = useLocation();
  const navigate = useNavigate();
  const context = useOutletContext();

  return (
    <section>
      <Helmet>
        <title>{`${context} | Details Unit `}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="عرض" name="الوحدة / " />

        <div className={styles.details_content}>
          <div className={styles.details_wapper}>
            <div className={styles.details_info}>
              <h3>اسم المجمع :</h3>
              <span>{state.unitPrefix}</span>
            </div>
            <div className={styles.details_info}>
              <h3> رقم الوحدة :</h3>
              <span>{state.unitNumber}</span>
            </div>
            <div className={styles.details_info}>
              <h3> نوع الوحدة :</h3>
              <span>{state.unitType}</span>
            </div>
            <div className={styles.details_info}>
              <h3> دور الوحدة :</h3>
              <span>{state.unitRole}</span>
            </div>
            <div className={styles.details_info}>
              <h3> عدد الغرف :</h3>
              <span>{state.numberOfBedRoom}</span>
            </div>
            <div className={styles.details_info}>
              <h3> عدد الحمامات :</h3>
              <span>{state.numberOfBathroom}</span>
            </div>
            <div className={styles.details_info}>
              <h3> سعر الوحدة :</h3>
              <span>{state.unitPrice}</span>
            </div>
            <div className={styles.details_info}>
              <h3> تاريخ البيع :</h3>
              <span>{state.unitSoldDate}</span>
            </div>
            <div className={styles.details_info}>
              <h3> الحالة :</h3>
              <span>
                {
                  unitStatus?.find((status) => status.id === state.unitStatus)
                    ?.label
                }
              </span>
            </div>
          </div>

          <button onClick={() => navigate(-1)}>عودة</button>
        </div>
      </div>
    </section>
  );
};

export default DetailsUnit;
