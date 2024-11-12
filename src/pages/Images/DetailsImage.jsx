import styles from "@styles/Page.module.css";
import {
  Navigate,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import PathName from "@components/Housing-system/PathName/PathName";
import { Helmet } from "react-helmet";
import { CheckRoles } from "@utils/CheckRoles";

const DetailsImage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const context = useOutletContext();

  if (!CheckRoles("ManagementOwner")) {
    return <Navigate to={"*"} replace />;
  }

  return (
    <section>
      <Helmet>
        <title>{`${context} | Details Images`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="عرض" name="الصور / " />

        <div className={styles.details_content}>
          <div
            className={styles.details_wapper}
            style={{ gridTemplateColumns: "auto" }}
          >
            <div className={styles.details_info}>
              <h3>اسم المجمع :</h3>
              <span>{state.managementId}</span>
            </div>

            <div>
              {state?.row?.imageInSliders?.map((img) => (
                <div
                  key={img.id}
                  style={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "space-between",
                    gap: "30px",
                    marginBottom: "30px",
                  }}
                >
                  <h3 style={{ color: "#333" }}>
                    العنوان: <p style={{ color: "#666" }}>{img.title}</p>
                  </h3>
                  <h3 style={{ color: "#333" }}>
                    الوصف: <p style={{ color: "#666" }}>{img.description}</p>
                  </h3>
                  <img
                    src={`${import.meta.env.VITE_WEBSITE_API_URL_image}/${
                      img.imageUrl
                    }`}
                    alt={img.imageUrl}
                    loading="lazy"
                    width={120}
                    height={120}
                  />
                </div>
              ))}
            </div>

            <div></div>
          </div>

          <button onClick={() => navigate(-1)}>عودة</button>
        </div>
      </div>
    </section>
  );
};

export default DetailsImage;
