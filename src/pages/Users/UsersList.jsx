import { useEffect, useState } from "react";
import styles from "@styles/Page.module.css";
import ActionTable from "@components/Housing-system/ActionTable/ActionTable";
import PathName from "@components/Housing-system/PathName/PathName";
import Search from "@components/Housing-system/Search/Search";
import Table from "@components/Housing-system/Table/Table";
import { ColumnUsers } from "@shared/ColumnTables";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  fetchDetailsUser,
  fetchUsers,
} from "@store/reducers/Users/UsersSlice";
import Success from "@components/feedback/Success/Success";
import Tabel_Pagination from "@components/Housing-system/Table/Pagination/Pagination";
import { Helmet } from "react-helmet";

const UsersList = () => {
  const [page, setPage] = useState(1);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  const detailsItem = (item) => {
    navigate(`/users/list/${item.id}/details`, {
      state: item,
    });
  };

  const editItem = (item) => {
    dispatch(fetchDetailsUser(item?.userName))
      .unwrap()
      .then(() => {
        navigate(`/users/list/${item.id}/edit`, {
          state: item,
        });
      });
  };

  const onDelete = (id) => {
    dispatch(deleteUser(id))
      .unwrap()
      .then(() => {
        dispatch(fetchUsers());
        setSuccess("تم الحذف بنجاح");
      });
  };

  return (
    <section>
      <Helmet>
        <title>{`${context} | Users List `}</title>
      </Helmet>

      <div className="section_content">
        <div className={styles.title}>
          <PathName path="القائمة" name="المستخدمين / " />
          <Search />
        </div>

        <Success message={success} />

        <div className={styles.Table}>
          <Table Column={ColumnUsers}>
            {users?.data?.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.fullName}</td>
                <td>
                  {row.status === 0 && "بدون قيمة"}
                  {row.status === 1 && "فعال"}
                  {row.status === 2 && "موقوف"}
                </td>
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
          last_page={users.totalPages}
          handlerPagination={setPage}
        />
      </div>
    </section>
  );
};

export default UsersList;
