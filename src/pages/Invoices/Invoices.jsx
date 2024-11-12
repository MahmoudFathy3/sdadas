import Success from "@components/feedback/Success/Success";
import FormInvoices from "@components/forms/Invoices/FormInvoices";
import PathName from "@components/Housing-system/PathName/PathName";
import { createInvoice } from "@store/reducers/Invoices/InvoicesSlice";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";

const Invoices = () => {
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const context = useOutletContext();

  const onSubmit = (data) => {
    dispatch(createInvoice(data))
      .unwrap()
      .then(() => {
        setSuccess("تم اضافة فاتورة بنجاح");
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
        <title>{`${context} | Add Invoices`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="اضافة" name="الفواتير / " />

        <Success message={success} />

        <FormInvoices onSubmit={onSubmit} reset={true} />
      </div>
    </section>
  );
};

export default Invoices;
