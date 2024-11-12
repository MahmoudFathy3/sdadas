import { useEffect, useState } from "react";
import styles from "@styles/Page.module.css";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import ActionTable from "@components/Housing-system/ActionTable/ActionTable";
import PathName from "@components/Housing-system/PathName/PathName";
import Search from "@components/Housing-system/Search/Search";
import Table from "@components/Housing-system/Table/Table";
import { ColumnNotification } from "@shared/ColumnTables";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNotification,
  fetchNotifications,
} from "@store/reducers/Notification/NotificationSlice";
import Tabel_Pagination from "@components/Housing-system/Table/Pagination/Pagination";
import Success from "@components/feedback/Success/Success";
import { Helmet } from "react-helmet";
import { CheckRoles } from "@utils/CheckRoles";

const NotificationList = () => {
  const [page, setPage] = useState(1);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { notifications } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(fetchNotifications(page));
  }, [dispatch, page]);

  const detailsItem = (item) => {
    navigate(`/notifications/list/${item.id}/details`, {
      state: item,
    });
  };

  const editItem = (item) => {
    navigate(`/notifications/list/${item.id}/edit`, {
      state: item,
    });
  };

  const onDelete = (id) => {
    dispatch(deleteNotification(id))
      .unwrap()
      .then(() => {
        dispatch(fetchNotifications(page));
        setSuccess("تم الحذف بنجاح");
      });
  };

  if (!CheckRoles("SuperAdmin")) {
    return <Navigate to={"*"} replace />;
  }

  return (
    <section>
      <Helmet>
        <title>{`${context} | Notification List`}</title>
      </Helmet>

      <div className="section_content">
        <div className={styles.title}>
          <PathName path="القائمة" name="الاشعارات / " />
          <Search />
        </div>

        <Success message={success} />

        <div className={styles.Table}>
          <Table Column={ColumnNotification}>
            {notifications?.data?.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.title}</td>
                <td>{row.message}</td>
                <td>
                  <ActionTable
                    detailsItem={() => detailsItem(row)}
                    editItem={() => editItem(row)}
                    deleteItem={() => onDelete(row.id)}
                  />
                </td>
              </tr>
            ))}
          </Table>
        </div>

        {/* Pagination  */}
        <Tabel_Pagination
          page={page}
          last_page={notifications.totalPages}
          handlerPagination={setPage}
        />
      </div>
    </section>
  );
};

export default NotificationList;
