import { useEffect, useState } from "react";
import styles from "@styles/Page.module.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import ActionTable from "@components/Housing-system/ActionTable/ActionTable";
import PathName from "@components/Housing-system/PathName/PathName";
import Search from "@components/Housing-system/Search/Search";
import Table from "@components/Housing-system/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGovernorate,
  fetchGovernorates,
} from "@store/reducers/Governorate/GovernorateSlice";
import Success from "@components/feedback/Success/Success";
import Tabel_Pagination from "@components/Housing-system/Table/Pagination/Pagination";
import { Helmet } from "react-helmet";

const GovernorateList = () => {
  const [success, setSuccess] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { governorates } = useSelector((state) => state.governorate);

  useEffect(() => {
    dispatch(fetchGovernorates(page));
  }, [dispatch, page]);

  const editItem = (item) => {
    navigate(`/governorate/list/${item.id}/edit`, {
      state: { item },
    });
  };

  const onDelete = (id) => {
    dispatch(deleteGovernorate(id))
      .unwrap()
      .then(() => {
        dispatch(fetchGovernorates());
        setSuccess("تم الحذف بنجاح");
      });
  };

  // Hide Success message
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    }
  }, [success]);

  return (
    <section>
      <Helmet>
        <title>{`${context} | Governorate List`}</title>
      </Helmet>

      <div className="section_content">
        <div className={styles.title}>
          <PathName path="القائمة" name="المحافظات / " />
          <Search />
        </div>

        <Success message={success} />

        <div className={styles.Table}>
          <Table Column={["#", "اسم المحافظة", "الحالة"]}>
            {governorates?.data?.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>
                  <ActionTable
                    hide={true}
                    detailsItem={() => ""}
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
          last_page={governorates?.totalPages}
          handlerPagination={setPage}
        />
      </div>
    </section>
  );
};

export default GovernorateList;
