import { useEffect, useState } from "react";
import styles from "@styles/Page.module.css";
import ActionTable from "@components/Housing-system/ActionTable/ActionTable";
import PathName from "@components/Housing-system/PathName/PathName";
import Search from "@components/Housing-system/Search/Search";
import Table from "@components/Housing-system/Table/Table";
import { ColumnBuildings } from "@shared/ColumnTables";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBuilding,
  fetchBuildings,
} from "@store/reducers/Building/BuildingSlice";
import Tabel_Pagination from "@components/Housing-system/Table/Pagination/Pagination";
import Success from "@components/feedback/Success/Success";
import { Helmet } from "react-helmet";

const BuildingsList = () => {
  const [page, setPage] = useState(1);
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useOutletContext();

  const { buildings } = useSelector((state) => state.buildings);

  useEffect(() => {
    dispatch(fetchBuildings(page));
  }, [dispatch, page]);

  const detailsItem = (item) => {
    navigate(`/buildings/list/${item.id}/details`, {
      state: item,
    });
  };

  const editItem = (item) => {
    navigate(`/buildings/list/${item.id}/edit`, {
      state: item,
    });
  };

  const onDeleteItem = (id) => {
    dispatch(deleteBuilding(id))
      .unwrap()
      .then(() => {
        dispatch(fetchBuildings());
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
        <title>{`${context} | Buildings List`}</title>
      </Helmet>

      <div className="section_content">
        <div className={styles.title}>
          <PathName path="القائمة" name="المباني / " />
          <Search />
        </div>

        <Success message={success} />

        <div className={styles.Table}>
          <Table Column={ColumnBuildings}>
            {buildings?.data?.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.managementId}</td>
                <td>{row.name}</td>
                <td>{row.totalFloor}</td>
                <td>{row.unitPerFloor}</td>
                <td>
                  {row.status === 0 && "بدون قيمة"}
                  {row.status === 1 && "فعال"}
                  {row.status === 2 && "موقوف"}
                </td>
                <td>
                  <ActionTable
                    detailsItem={() => detailsItem(row)}
                    editItem={() => editItem(row)}
                    deleteItem={() => onDeleteItem(row.id)}
                  />
                </td>
              </tr>
            ))}
          </Table>
        </div>

        {/* <Pagination /> */}
        <Tabel_Pagination
          page={page}
          handlerPagination={setPage}
          last_page={buildings?.totalPages}
        />
      </div>
    </section>
  );
};

export default BuildingsList;
