import styles from "@styles/forms.module.css";
import PropTypes from "prop-types";
import { Box, IconButton } from "@mui/material";
import Select from "@components/Housing-system/Select/Select";
import FormControlls from "@components/Housing-system/FormControlls/FormControlls";
import FormButtons from "@components/Housing-system/FormButtons/FormButtons";
import { onReset } from "@utils/onReset";
import Table from "@components/Housing-system/Table/Table";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "@store/reducers/Service/ServiceSlice";
import Complexe from "@components/Housing-system/Select/Shared/Complexe/Complexe";
import UnitForComplexe from "@components/Housing-system/Select/Shared/Units/UnitForComplexe";
import DateTime from "@components/Housing-system/Select/Shared/Invoices/DateTime/DateTime";

const FormInvoices = ({ onSubmit, data, reset, edit }) => {
  const [invoice_service, setInvoiceService] = useState(
    data?.invoice?.invoiceItems || []
  );
  const [total_invoice, setTotalInvoice] = useState(0);
  const [title, setTitle] = useState("");
  const [price_service, setPriceService] = useState({ price: "" });
  const [complexe_id, setComplexeId] = useState(data?.managementId || "");
  const [unit_id, setUnitId] = useState(data?.invoice?.unitId || "");
  const [invoice_type, setInvoiceType] = useState(
    data?.invoice?.invoiceType || ""
  );

  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices(0));
  }, [dispatch]);

  useEffect(() => {
    if (data?.invoice) {
      setTitle(data?.invoice?.invoiceTitle);
      // setComplexeId(data.managementId);
      setUnitId(data?.invoice?.unitId);
      setInvoiceType(data?.invoice?.invoiceType);
      setInvoiceService(data?.invoice?.invoiceItems);
    }
  }, [data]);

  // Add Invoice Service in Table
  const handlerInvoiceService = () => {
    if (price_service?.label) {
      if (
        invoice_service.find(
          (service) => service.facilityId === price_service.id
        )
      )
        return;
      setInvoiceService((prev) => [
        ...prev,
        {
          facilityId: price_service.id,
          price: price_service.price,
        },
      ]);
    }
  };

  // filter Invoice Service in Table
  const handlerFilterInvoiceService = (id) => {
    let filter = invoice_service.filter((service) => service.facilityId !== id);

    setInvoiceService(filter);
  };

  const handlerSubmitted = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data2 = Object.fromEntries(formData);

    let Invoice = {
      invoiceTitle: title || data?.invoice?.invoiceTitle,
      invoiceDescription: data2.invoiceDescription,
      invoiceData: data2.invoiceData,
      invoiceType: invoice_type.id || invoice_type,
      invoiceItems: invoice_service,
      managementId: complexe_id,
      unitId: unit_id.id || unit_id,
    };

    if (edit) Invoice.id = data?.invoice?.id;

    onSubmit(Invoice);
    !data && setInvoiceService([]);
    e.currentTarget.reset();
  };

  useEffect(() => {
    let total = 0;
    invoice_service?.forEach((service) => (total += Number(service.price)));
    setTotalInvoice(total);
  }, [invoice_service]);

  return (
    <div className={styles.Invoice}>
      <Box className={styles.form}>
        <div className={styles.FormInvoices}>
          <FormControlls
            id="invoiceTitle"
            label="عنوان الفاتورة"
            type="text"
            fullWidth
            required={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Select
            id="facilityId"
            label="اسم الخدمة"
            options={services?.data?.map((service) => ({
              id: service.id,
              label: service.name,
              price: service.price,
            }))}
            required={true}
            setState={setPriceService}
          />
          <FormControlls
            id="price"
            label="سعر الخدمة"
            type="number"
            fullWidth
            required={true}
            value={price_service.price}
            onChange={(e) =>
              setPriceService((prev) => ({ ...prev, price: e.target.value }))
            }
          />
          <div className={styles.form_buttons}>
            <button onClick={handlerInvoiceService}>اضافة</button>
          </div>
        </div>
      </Box>

      {/*  */}
      <div className={styles.InvoiceWapper}>
        <Box
          component={"form"}
          onSubmit={handlerSubmitted}
          className={styles.form}
          style={{ paddingTop: "0px" }}
        >
          <div className={`${styles.form_table}`}>
            <div className={styles.wapperForm}>
              <FormControlls
                id="invoiceDescription"
                label="وصف"
                type="text"
                fullWidth
                required={true}
                defaultValue={data?.invoice?.invoiceDescription}
              />

              <DateTime defaultValue={data?.invoice?.invoiceData} />

              {/* <FormControlls
                id="invoiceData"
                label="تاريخ الفاتورة"
                type="date"
                fullWidth
                required={true}
                defaultValue={data?.invoice?.invoiceData}
              /> */}
              {!edit && (
                <Select
                  id="invoiceType"
                  label="نوع الفاتورة"
                  disabled={edit ? true : false}
                  options={[
                    { id: 1, label: "Partial" },
                    { id: 2, label: "Total" },
                  ]}
                  required={true}
                  value={
                    (invoice_type?.id
                      ? invoice_type?.id === 1
                        ? "Partial"
                        : "Total"
                      : "Choose type") || invoice_type?.label
                  }
                  setState={setInvoiceType}
                />
              )}

              <Complexe
                id="managementId"
                label="المجمعات"
                defaultValue={complexe_id}
                setState={setComplexeId}
              />

              <UnitForComplexe
                id="unitId"
                label="الوحدة"
                complexe_id={complexe_id}
                defaultValue={unit_id}
                setState={setUnitId}
              />
            </div>

            <div className={styles.tableInvoice}>
              <Table Column={["#", "اسم الخدمة", "سعر الخدمة", "الحدث"]}>
                {invoice_service?.length < 1 && (
                  <tr>
                    <td>لا يوجد خدمة</td>
                  </tr>
                )}
                {invoice_service?.length > 0 &&
                  invoice_service?.map((row, index) => (
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td>
                        {
                          services?.data?.find(
                            (service) => service.id === row.facilityId
                          )?.name
                        }
                      </td>
                      <td>{row.price}</td>
                      <td>
                        <IconButton
                          onClick={() =>
                            handlerFilterInvoiceService(row.facilityId)
                          }
                        >
                          <MdDeleteOutline size={25} color="brown" />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
              </Table>
            </div>
          </div>

          <div className={styles.total}>
            <h3>اجمالي الفاتورة: {total_invoice}</h3>
            <FormButtons
              onReset={reset && onReset}
              edit={edit}
              state={{ managementId: data ? data.managementId : "" }}
            />
          </div>
        </Box>
      </div>
    </div>
  );
};

FormInvoices.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object,
  reset: PropTypes.bool,
  edit: PropTypes.bool,
};

export default FormInvoices;
