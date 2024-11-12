import { useEffect, useState } from "react";
import styles from "@styles/Page.module.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import ActionTable from "@components/Housing-system/ActionTable/ActionTable";
import PathName from "@components/Housing-system/PathName/PathName";
import Search from "@components/Housing-system/Search/Search";
import Table from "@components/Housing-system/Table/Table";
import { ColumnUnits } from "@shared/ColumnTables";
import { useDispatch, useSelector } from "react-redux";
import { DeleteUnit, fetchUnits } from "@store/reducers/Units/UnitsSlice";
import Tabel_Pagination from "@components/Housing-system/Table/Pagination/Pagination";
import Success from "@components/feedback/Success/Success";
import { Helmet } from "react-helmet";

const UnitsList = () => {
  const [page, setPage] = useState(1);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { units } = useSelector((state) => state.units);

  useEffect(() => {
    dispatch(fetchUnits(page));
  }, [dispatch, page]);

  const detailsItem = (item) => {
    navigate(`/units/list/${item.id}/details`, {
      state: item,
    });
  };

  const editItem = (item) => {
    navigate(`/units/list/${item.id}/edit`, {
      state: item,
    });
  };

  const onDelete = (id) => {
    dispatch(DeleteUnit(id))
      .unwrap()
      .then(() => {
        dispatch(fetchUnits(page));
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

  console.log(units);

  return (
    <section>
      <Helmet>
        <title>{`${context} | Units List`}</title>
      </Helmet>

      <div className="section_content">
        <div className={styles.title}>
          <PathName path="القائمة" name="الوحدات / " />
          <Search />
        </div>

        <Success message={success} />

        <div className={styles.Table}>
          <Table Column={ColumnUnits}>
            {units?.data?.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.managementId}</td>
                <td>{row.unitPrefix}</td>
                <td>{row.unitNumber}</td>
                <td>{row.unitType}</td>
                <td>{row.unitRole}</td>
                <td>{row.numberOfBedRoom}</td>
                <td>{row.unitPrice}</td>
                <td>{row.unitSoldDate}</td>
                <td>
                  {row.unitStatus === 0 && "USNull"}
                  {row.unitStatus === 1 && "Sold"}
                  {row.unitStatus === 2 && "UnSold"}
                  {row.unitStatus === 3 && "Defective"}
                  {row.unitStatus === 4 && "Rejected"}
                  {row.unitStatus === 5 && "LoanRejected"}
                  {row.unitStatus === 6 && "Requested"}
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

        {/* Pagination*/}
        <Tabel_Pagination
          page={page}
          last_page={units?.totalPages}
          handlerPagination={setPage}
        />
      </div>
    </section>
  );
};

export default UnitsList;
