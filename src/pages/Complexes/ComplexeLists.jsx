import styles from "@styles/Page.module.css";
import PathName from "@components/Housing-system/PathName/PathName";
import Search from "@components/Housing-system/Search/Search";
import Table from "@components/Housing-system/Table/Table";
import { ColumnComplexes } from "@shared/ColumnTables";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import ActionTable from "@components/Housing-system/ActionTable/ActionTable";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComplexe,
  fetchComplexes,
} from "@store/reducers/Complexes/ComplexeSlice";
import Tabel_Pagination from "@components/Housing-system/Table/Pagination/Pagination";
import Success from "@components/feedback/Success/Success";
import { Helmet } from "react-helmet";

const ComplexeLists = () => {
  const [page, setPage] = useState(1);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { complexes } = useSelector((state) => state.complexes);

  useEffect(() => {
    dispatch(fetchComplexes(page));
  }, [dispatch, page]);

  const detailsItem = (item) => {
    navigate(`/complexes/list/${item.id}/details`, {
      state: item,
    });
  };

  const editItem = (item) => {
    navigate(`/complexes/list/${item.id}/edit`, {
      state: item,
    });
  };

  const deleteItem = (id) => {
    dispatch(deleteComplexe(id))
      .unwrap()
      .then(() => {
        dispatch(fetchComplexes(page));
        setSuccess("تم حذف المجمع بنجاح");
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
        <title>{`${context} | Complexes List`}</title>
      </Helmet>

      <div className="section_content">
        <div className={styles.title}>
          <PathName path="القائمة" name="التجمعات / " />
          <Search />
        </div>

        <Success message={success} />

        <div className={styles.Table}>
          <Table Column={ColumnComplexes}>
            {complexes?.data?.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>{row.phoneNumber}</td>
                <td>{row.address1}</td>
                <td>{row.emailAddress}</td>
                <td>{row.city}</td>
                <td>{row.status === 1 ? "نشاط" : "غير نشاط"}</td>
                <td>
                  <ActionTable
                    detailsItem={() => detailsItem(row)}
                    editItem={() => editItem(row)}
                    deleteItem={() => deleteItem(row.id)}
                  />
                </td>
              </tr>
            ))}
          </Table>
        </div>

        {/* Pagination */}
        <Tabel_Pagination
          page={page}
          last_page={complexes?.totalPages}
          handlerPagination={setPage}
        />
      </div>
    </section>
  );
};

export default ComplexeLists;
