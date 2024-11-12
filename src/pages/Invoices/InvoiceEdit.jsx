import { useEffect } from "react";
import FormInvoices from "@components/forms/Invoices/FormInvoices";
import PathName from "@components/Housing-system/PathName/PathName";
import {
  fetchInvoiceById,
  fetchInvoices,
  updateInvoice,
} from "@store/reducers/Invoices/InvoicesSlice";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

const InvoiceEdit = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useOutletContext();

  const { invoiceById } = useSelector((state) => state.invoices);

  useEffect(() => {
    if (state?.id) {
      dispatch(fetchInvoiceById(state.id));
    }
  }, [dispatch, state]);

  useEffect(() => {}, []);

  const onSubmit = (data) => {
    dispatch(updateInvoice(data))
      .unwrap()
      .then(() => {
        dispatch(fetchInvoices({ ManagementId: state.managementId, page: 0 }));
        navigate("/invoices/list", {
          state: { managementId: state.managementId },
        });
      });
  };

  return (
    <section>
      <Helmet>
        <title>{`${context} | Edit Invoices`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="تعديل" name="الفواتير / " />
        {invoiceById?.data && (
          <FormInvoices
            onSubmit={onSubmit}
            data={{
              managementId: state.managementId,
              invoice: invoiceById?.data,
            }}
            edit={true}
          />
        )}
      </div>
    </section>
  );
};

export default InvoiceEdit;
