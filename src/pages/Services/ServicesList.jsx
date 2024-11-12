import { useEffect, useState } from "react";
import styles from "@styles/Page.module.css";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import ActionTable from "@components/Housing-system/ActionTable/ActionTable";
import PathName from "@components/Housing-system/PathName/PathName";
import Search from "@components/Housing-system/Search/Search";
import Table from "@components/Housing-system/Table/Table";
import { ColumnServices } from "@shared/ColumnTables";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteService,
  fetchServices,
} from "@store/reducers/Service/ServiceSlice";
import { fetchComplexes } from "@store/reducers/Complexes/ComplexeSlice";
import Success from "@components/feedback/Success/Success";
import Tabel_Pagination from "@components/Housing-system/Table/Pagination/Pagination";
import { Helmet } from "react-helmet";
import { CheckRoles } from "@utils/CheckRoles";

const ServicesList = () => {
  const [success, setSuccess] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { services } = useSelector((state) => state.services);
  const { complexes } = useSelector((state) => state.complexes);

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchComplexes());
  }, [dispatch]);

  const detailsItem = (item) => {
    navigate(`/services/list/${item.id}/details`, {
      state: item,
    });
  };

  const editItem = (item) => {
    navigate(`/services/list/${item.id}/edit`, {
      state: item,
    });
  };

  const onDelete = (id) => {
    dispatch(deleteService(id))
      .unwrap()
      .then(() => {
        dispatch(fetchServices());
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

  if (!CheckRoles("ManagementOwner")) {
    return <Navigate to={"*"} replace />;
  }

  return (
    <section>
      <Helmet>
        <title>{`${context} | Services List`}</title>
      </Helmet>

      <div className="section_content">
        <div className={styles.title}>
          <PathName path="القائمة" name="الخدمات / " />
          <Search />
        </div>

        <Success message={success} />

        <div className={styles.Table}>
          <Table Column={ColumnServices}>
            {services?.data?.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>
                  {
                    complexes?.data?.find(
                      (complexe) => complexe.id === row.managementId
                    ).name
                  }
                </td>
                <td>{row.price}</td>
                <td>{row.isActive ? "نشاط" : "غير نشاط"}</td>
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

        {/* <Pagination /> */}
        <Tabel_Pagination
          page={page}
          last_page={services?.totalPages}
          handlerPagination={setPage}
        />
      </div>
    </section>
  );
};

export default ServicesList;
