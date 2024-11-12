import styles from "@styles/Page.module.css";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import PathName from "@components/Housing-system/PathName/PathName";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnitByManagementID } from "@store/reducers/Units/UnitsSlice";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const DetailsComplaint = () => {
  const [storeMangementId, setStoreManagementId] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { unitByManagementId } = useSelector((state) => state.units);

  useEffect(() => {
    dispatch(fetchUnitByManagementID({ managementId: state.managementId }));
    setStoreManagementId({ managementId: state?.managementId });
  }, [dispatch, state]);

  return (
    <section>
      <Helmet>
        <title>{`${context} | Details Complaint`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="عرض" name="الشكاوي / " />

        <div className={styles.details_content}>
          <div className={styles.details_wapper}>
            <div className={styles.details_info}>
              <h3> عنوان الشكوي :</h3>
              <span>{state?.item?.subject}</span>
            </div>
            <div className={styles.details_info}>
              <h3> الوحدة :</h3>
              <span>
                {
                  unitByManagementId?.data?.find(
                    (unit) => unit.id === state?.item?.unitId
                  )?.unitPrefix
                }
              </span>
            </div>
            <div className={styles.details_info}>
              <h3> رسالة الشكوي :</h3>
              <span>{state?.item?.message}</span>
            </div>

            <div className={styles.details_info}>
              <h3></h3>
              <span></span>
            </div>

            <div
              className={styles.details_info}
              style={{ alignItems: "self-start" }}
            >
              <h3> صور الشكوي :</h3>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "20px",
                  width: "500px",
                }}
              >
                {state?.item?.complaintDocs?.map((complaintImg) => (
                  <div
                    key={complaintImg.complaintDocId}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <img
                      src={`${import.meta.env.VITE_WEBSITE_API_URL_image}${
                        complaintImg.mediaUrl
                      }`}
                      alt="Complaint Image"
                      loading="lazy"
                      width={150}
                      height={150}
                    />
                  </div>
                ))}
              </span>
            </div>
          </div>

          <button
            onClick={() =>
              navigate("/complaints/list", {
                state: storeMangementId,
              })
            }
          >
            عودة
          </button>
        </div>
      </div>
    </section>
  );
};

export default DetailsComplaint;
