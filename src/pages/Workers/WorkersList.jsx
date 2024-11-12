import { useEffect, useState } from "react";
import styles from "@styles/Page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import Success from "@components/feedback/Success/Success";
import PathName from "@components/Housing-system/PathName/PathName";
import Search from "@components/Housing-system/Search/Search";
import Tabel_Pagination from "@components/Housing-system/Table/Pagination/Pagination";
import ActionTable from "@components/Housing-system/ActionTable/ActionTable";
import Table from "@components/Housing-system/Table/Table";
import {
  deleteWorkers,
  fetchWorkers,
} from "@store/reducers/Workers/WorkersSlice";
import { fetchUsers } from "@store/reducers/Users/UsersSlice";
import { fetchComplexes } from "@store/reducers/Complexes/ComplexeSlice";
import { Helmet } from "react-helmet";

const WorkersList = () => {
  const [page, setPage] = useState(1);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { workers } = useSelector((state) => state.workers);
  const { users } = useSelector((state) => state.users);
  const { complexes } = useSelector((state) => state.complexes);

  useEffect(() => {
    dispatch(fetchWorkers(page));
    dispatch(fetchUsers(0));
    dispatch(fetchComplexes(0));
  }, [dispatch, page]);

  const detailsItem = (item) => {
    navigate(`/workers/list/${item.id}/details`, {
      state: item,
    });
  };

  const editItem = (item) => {
    navigate(`/workers/list/${item.id}/edit`, {
      state: item,
    });
  };

  const onDelete = (id) => {
    dispatch(deleteWorkers(id))
      .unwrap()
      .then(() => {
        dispatch(fetchWorkers(page));
        setSuccess("تم الحذف بنجاح");
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
        <title>{`${context} | Workers List`}</title>
      </Helmet>

      <div className="section_content">
        <div className={styles.title}>
          <PathName path="القائمة" name="العمال / " />
          <Search />
        </div>

        <Success message={success} />

        <div className={styles.Table}>
          <Table
            Column={[
              "#",
              "اسم المستخدم",
              "الصناعة",
              "الدقائق",
              "اسم المجمع",
              "الحدث",
            ]}
          >
            {workers?.data?.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>
                  {
                    users?.data?.find((user) => user.id === row.userId)
                      ?.fullName
                  }
                </td>
                <td>{row.work.name}</td>
                <td>{row.minute}</td>
                <td>
                  {
                    complexes?.data?.find(
                      (complexe) => complexe.id === row.work.managementId
                    )?.name
                  }
                </td>
                <td>
                  <ActionTable
                    hide={true}
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
          last_page={workers.totalPages}
          handlerPagination={setPage}
        />
      </div>
    </section>
  );
};

export default WorkersList;
