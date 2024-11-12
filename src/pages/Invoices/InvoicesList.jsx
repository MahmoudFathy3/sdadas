import { useEffect, useState } from "react";
import styles from "@styles/Page.module.css";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import ActionTable from "@components/Housing-system/ActionTable/ActionTable";
import PathName from "@components/Housing-system/PathName/PathName";
import Search from "@components/Housing-system/Search/Search";
import Table from "@components/Housing-system/Table/Table";
import { ColumnInvoices } from "@shared/ColumnTables";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoices } from "@store/reducers/Invoices/InvoicesSlice";
import Tabel_Pagination from "@components/Housing-system/Table/Pagination/Pagination";
import Complexe from "@components/Housing-system/Select/Shared/Complexe/Complexe";
import { fetchComplexes } from "@store/reducers/Complexes/ComplexeSlice";
import { fetchUnitByManagementID } from "@store/reducers/Units/UnitsSlice";
import { Helmet } from "react-helmet";

const InvoicesList = () => {
  const [success, setSuccess] = useState("");
  const [page, setPage] = useState(1);
  const [complexe_id, setComplexeId] = useState("");

  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useOutletContext();

  const { invoices } = useSelector((state) => state.invoices);
  const { unitByManagementId } = useSelector((state) => state.units);
  const { complexes } = useSelector((state) => state.complexes);

  useEffect(() => {
    if (state?.managementId) {
      setComplexeId(state?.managementId);
    }
  }, [state]);

  useEffect(() => {
    if (complexe_id) {
      dispatch(fetchInvoices({ ManagementId: complexe_id, page }));
      dispatch(fetchComplexes(0));
      dispatch(fetchUnitByManagementID({ managementId: complexe_id }));
    }
  }, [dispatch, page, complexe_id]);

  const detailsItem = (item) => {
    navigate(`/invoices/list/${item.id}/details`, {
      state: item,
    });
  };

  console.log(complexe_id);

  const editItem = (item) => {
    navigate(`/invoices/list/${item.id}/edit`, {
      state: { managementId: complexe_id, id: item.id },
    });
  };

  const onDelete = (id) => {};

  return (
    <section>
      <Helmet>
        <title>{`${context} | Invoices List`}</title>
      </Helmet>

      <div className="section_content">
        <div className={styles.title}>
          <PathName path="القائمة" name="الفواتير / " />
          <Search />
        </div>

        <div style={{ width: "30%", margin: "30px 0 0" }}>
          <Complexe
            id="complexe"
            label=""
            defaultValue={complexe_id}
            setState={setComplexeId}
          />
        </div>

        <div className={styles.Table}>
          <Table Column={ColumnInvoices}>
            {invoices?.data?.length > 0 ? (
              invoices?.data?.map((row, index) => (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td>{row.invoiceTitle}</td>
                  <td>
                    {
                      complexes?.data?.find(
                        (complexe) => complexe.id === complexe_id
                      )?.name
                    }
                  </td>
                  <td>
                    {
                      unitByManagementId?.data?.find(
                        (unit) => unit.id === row.unitId
                      )?.unitPrefix
                    }
                  </td>
                  <td>{row.invoiceDescription}</td>
                  <td>
                    {row.invoiceType === 1 && "Partial"}
                    {row.invoiceType === 2 && "Total"}
                  </td>
                  <td>{row.invoiceData}</td>
                  <td>{row.totalPrice}</td>
                  <td>
                    <ActionTable
                      detailsItem={() =>
                        detailsItem({
                          id: row.id,
                          invoiceTitle: row.invoiceTitle,
                          invoiceDescription: row.invoiceDescription,
                          invoiceType: row.invoiceType,
                          invoiceData: row.invoiceData,
                          totalPrice: row.totalPrice,
                          unitId: unitByManagementId?.data?.find(
                            (unit) => unit.id === row.unitId
                          )?.unitPrefix,
                          managementId: complexes?.data?.find(
                            (complexe) => complexe.id === complexe_id
                          )?.name,
                        })
                      }
                      editItem={() => editItem(row)}
                      deleteItem={() => onDelete(row.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>لا يوجد فواتير</td>
              </tr>
            )}
          </Table>
        </div>

        {/* Pagination */}
        <Tabel_Pagination
          page={page}
          last_page={invoices?.totalPages}
          handlerPagination={setPage}
        />
      </div>
    </section>
  );
};

export default InvoicesList;
