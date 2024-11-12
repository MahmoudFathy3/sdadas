import styles from "@styles/Page.module.css";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import PathName from "@components/Housing-system/PathName/PathName";
import { useDispatch, useSelector } from "react-redux";
import { fetchComplexes } from "@store/reducers/Complexes/ComplexeSlice";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const DetailsAds = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { complexes } = useSelector((state) => state.complexes);

  useEffect(() => {
    dispatch(fetchComplexes(0));
  }, [dispatch]);

  return (
    <section>
      <Helmet>
        <title>{`${context} | Details Ads`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="عرض" name="الاعلانات / " />

        <div className={styles.details_content}>
          <div className={styles.details_wapper}>
            <div className={styles.details_info}>
              <h3>اسم الاعلان :</h3>
              <span>{state.title}</span>
            </div>
            <div className={styles.details_info}>
              <h3>العنوان الفرعي:</h3>
              <span>{state.subTitle}</span>
            </div>
            <div className={styles.details_info}>
              <h3> المحتوي :</h3>
              <span>{state.content}</span>
            </div>
            <div className={styles.details_info}>
              <h3> اسم المجمع :</h3>
              <span>
                {
                  complexes?.data?.find(
                    (complexe) => complexe.id === state.managementId
                  )?.name
                }
              </span>
            </div>
            <div
              className={styles.details_info}
              style={{ alignItems: "flex-start" }}
            >
              <h3> الحالة :</h3>
              <span>{state.isActive ? "نشاط" : "غير نشاط"}</span>
            </div>
            <div
              className={styles.details_info}
              style={{ alignItems: "flex-start" }}
            >
              <h3> صورة الاعلان :</h3>
              <span>
                <img
                  src={`${import.meta.env.VITE_WEBSITE_API_URL_image}${
                    state.mediaUrl
                  }`}
                  alt="img ads"
                  loading="lazy"
                  width={200}
                  height={200}
                />
              </span>
            </div>
          </div>

          <button onClick={() => navigate(-1)}>عودة</button>
        </div>
      </div>
    </section>
  );
};

export default DetailsAds;
