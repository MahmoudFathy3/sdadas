import styles from "@styles/Page.module.css";
import PathName from "@components/Housing-system/PathName/PathName";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchGovernorates } from "@store/reducers/Governorate/GovernorateSlice";
import { Helmet } from "react-helmet";

const DetailsComplexe = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { governorates } = useSelector((state) => state.governorate);

  useEffect(() => {
    dispatch(fetchGovernorates(0));
  }, [dispatch]);

  return (
    <section>
      <Helmet>
        <title>{`${context} | Details Complexes`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="عرض" name="التجمعات / " />

        <div className={styles.details_content}>
          <div className={styles.details_wapper}>
            <div className={styles.details_info}>
              <h3>اسم المجمع :</h3>
              <span>{state.name}</span>
            </div>
            <div className={styles.details_info}>
              <h3> رقم الهاتف :</h3>
              <span>{state.phoneNumber}</span>
            </div>
            <div className={styles.details_info}>
              <h3> رقم المكتب :</h3>
              <span>{state.officeNumber}</span>
            </div>
            <div className={styles.details_info}>
              <h3> البريد الالكتروني :</h3>
              <span>{state.emailAddress}</span>
            </div>
            <div className={styles.details_info}>
              <h3> العنوان الاول :</h3>
              <span>{state.address1}</span>
            </div>
            <div className={styles.details_info}>
              <h3> العنوان الثاني :</h3>
              <span>{state.address2}</span>
            </div>
            <div className={styles.details_info}>
              <h3> المحافظة :</h3>
              <span>
                {
                  governorates?.data?.find(
                    (governorate) => governorate.id === state.stateId
                  )?.name
                }
              </span>
            </div>
            <div className={styles.details_info}>
              <h3> المدينة :</h3>
              <span>{state.city}</span>
            </div>
            <div className={styles.details_info}>
              <h3> الناحية :</h3>
              <span>{state.side}</span>
            </div>
            <div className={styles.details_info}>
              <h3> نوع العمولة :</h3>
              <span>
                {state.invoiceCalculationType === 1 && "Percentage"}
                {state.invoiceCalculationType === 2 && "FixedAmount"}
              </span>
            </div>
            <div className={styles.details_info}>
              <h3> قيمة العمولة :</h3>
              <span>{state.invoiceCommission}</span>
            </div>
            <div className={styles.details_info}>
              <h3> عدد الوحدات :</h3>
              <span>{state.numberOfUnit}</span>
            </div>
            <div className={styles.details_info}>
              <h3> الحالة :</h3>
              <span>
                {state.status === 0 && "بدون قيمة"}
                {state.status === 1 && "فعال"}
                {state.status === 2 && "موقوف"}
              </span>
            </div>
            <div className={styles.details_info}>
              <h3> Domain :</h3>
              <span>{state.domain}</span>
            </div>
            <div className={styles.details_info}>
              <h3> الوصف :</h3>
              <span>{state.description}</span>
            </div>
          </div>

          <button onClick={() => navigate(-1)}>عودة</button>
        </div>
      </div>
    </section>
  );
};

export default DetailsComplexe;
