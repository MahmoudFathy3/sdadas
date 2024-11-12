import { useEffect, useState } from "react";
import styles from "@styles/Page.module.css";
import ActionTable from "@components/Housing-system/ActionTable/ActionTable";
import PathName from "@components/Housing-system/PathName/PathName";
import Search from "@components/Housing-system/Search/Search";
import Table from "@components/Housing-system/Table/Table";
import { ColumnComplaints } from "@shared/ColumnTables";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComplaint,
  fetchComplaints,
} from "@store/reducers/Complaints/ComplaintsSlice";
import Success from "@components/feedback/Success/Success";
import Tabel_Pagination from "@components/Housing-system/Table/Pagination/Pagination";
import Complexe from "@components/Housing-system/Select/Shared/Complexe/Complexe";
import { fetchUnitByManagementID } from "@store/reducers/Units/UnitsSlice";
import Select from "@components/Housing-system/Select/Select";
import { Helmet } from "react-helmet";

const ComplaintsList = () => {
  const [page, setPage] = useState(1);
  const [success, setSuccess] = useState("");
  const [managementId, setManagementId] = useState("");
  const [unitId, setUnitId] = useState("");

  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { complaints } = useSelector((state) => state.complaints);
  const { unitByManagementId } = useSelector((state) => state.units);

  useEffect(() => {
    if (managementId) {
      dispatch(fetchComplaints({ managementId, unitId: unitId?.id, page }));
      dispatch(fetchUnitByManagementID({ managementId }));
    }
  }, [dispatch, managementId, unitId, page]);

  useEffect(() => {
    if (state?.managementId) {
      setManagementId(state?.managementId);
    }
  }, [state]);

  const detailsItem = (item) => {
    navigate(`/complaints/list/${item.id}/details`, {
      state: { item, managementId },
    });
  };

  const editItem = (item) => {
    navigate(`/complaints/list/${item.id}/edit`, {
      state: item,
    });
  };

  const onDelete = (id) => {
    dispatch(deleteComplaint(id))
      .unwrap()
      .then(() => {
        dispatch(fetchComplaints());
        setSuccess("تم الحذف الشكوي بنجاح");
      });
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }
  }, [success]);

  return (
    <section>
      <Helmet>
        <title>{`${context} | Complaint List`}</title>
      </Helmet>

      <div className="section_content">
        <div className={styles.title}>
          <PathName path="القائمة" name="الشكاوي / " />
          <Search />
        </div>

        <Success message={success} />

        {/* Choose select */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "50%",
            gap: "30px",
            paddingTop: "50px",
          }}
        >
          <Complexe
            id="managementId"
            label="اسم المجمع"
            setState={setManagementId}
            placeholder="اختار مجمع"
            defaultValue={managementId}
          />

          <Select
            id="unitId"
            label="الوحدة"
            options={unitByManagementId?.data?.map((unit) => ({
              id: unit.id,
              label: unit.unitPrefix,
            }))}
            setState={setUnitId}
            placeholder="اختار وحدة"
          />
        </div>

        <div className={styles.Table}>
          <Table Column={ColumnComplaints}>
            {complaints?.data?.length > 0 ? (
              complaints?.data?.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {
                      unitByManagementId?.data?.find(
                        (unit) => unit.id === row.unitId
                      )?.unitPrefix
                    }
                  </td>
                  <td>{row.subject}</td>
                  <td>
                    {row.status === 0 && "بدون قيمة"}
                    {row.status === 1 && "فعال"}
                    {row.status === 2 && "معلق"}
                  </td>
                  <td>
                    {row.complaintDocs[0]?.mediaUrl ? (
                      <img
                        src={`${import.meta.env.VITE_WEBSITE_API_URL_image}${
                          row.complaintDocs[0]?.mediaUrl
                        }`}
                        alt="complaint_Image"
                        loading="lazy"
                        width={80}
                        height={80}
                      />
                    ) : (
                      "لا يوجد صورة"
                    )}
                  </td>
                  <td>
                    <ActionTable
                      detailsItem={() => detailsItem(row)}
                      editItem={() => editItem(row)}
                      deleteItem={() => onDelete(row.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>لا يوجد نتائج</td>
              </tr>
            )}
          </Table>
        </div>

        {/* Pagination */}
        <Tabel_Pagination
          page={page}
          handlerPagination={setPage}
          last_page={complaints?.totalPages}
        />
      </div>
    </section>
  );
};

export default ComplaintsList;
