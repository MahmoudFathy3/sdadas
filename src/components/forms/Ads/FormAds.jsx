import styles from "@styles/forms.module.css";
import PropTypes from "prop-types";
import { Box, FormControl, FormLabel } from "@mui/material";
import FormControlls from "@components/Housing-system/FormControlls/FormControlls";
import FormButtons from "@components/Housing-system/FormButtons/FormButtons";
import { onReset } from "@utils/onReset";
import Complexe from "@components/Housing-system/Select/Shared/Complexe/Complexe";
import { useState } from "react";

const FormAds = ({ onSubmit, ads, reset, edit }) => {
  const [ManagementId, setManagementId] = useState("");

  const handlerSubmitted = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    let Ads = {
      title: data.title,
      ManagementId: ManagementId || ads.managementId,
      ContactUs: data.ContactUs,
      MediaFile: data.MediaFile.name ? data.MediaFile : ads.mediaUrl,
      Content: data.Content,
    };

    if (edit) Ads.id = ads.id;

    console.log(Ads);

    onSubmit(Ads);
    onReset(event.currentTarget.reset());
  };

  return (
    <Box component={"form"} onSubmit={handlerSubmitted} className={styles.form}>
      <div className={styles.form_wapper}>
        <FormControlls
          id="title"
          label="عنوان الاعلان"
          type="text"
          fullWidth
          required={true}
          defaultValue={ads?.title}
        />
        <Complexe
          id="ManagementId"
          label="اسم المجمع"
          setState={setManagementId}
          defaultValue={ads?.managementId}
        />

        <FormControlls
          id="ContactUs"
          label="رقم الواتس"
          type="number"
          fullWidth
          required={true}
          defaultValue={ads?.contactUs}
        />
      </div>
      <div className={styles.Complaints} style={{ position: "relative" }}>
        {ads?.mediaUrl && (
          <img
            src={`${import.meta.env.VITE_WEBSITE_API_URL_image}${
              ads?.mediaUrl
            }`}
            alt="img ads"
            loading="lazy"
            width={200}
            height={200}
            style={{
              position: "absolute",
              bottom: "50px",
              right: "40px",
              zIndex: 999,
            }}
          />
        )}
        <FormControlls
          id="MediaFile"
          label="الصورة"
          type="file"
          fullWidth
          required={edit ? false : true}
          // defaultValue={ads?.mediaUrl}
          style={{ position: "relative" }}
        />
        <FormControl sx={{ gap: 1, width: "100%" }}>
          <FormLabel htmlFor="Content">
            المحتوي<span style={{ color: "red" }}>*</span>
          </FormLabel>
          <textarea
            id="Content"
            name="Content"
            required
            defaultValue={ads?.content}
          ></textarea>
        </FormControl>
      </div>
      <FormButtons onReset={reset && onReset} edit={edit} />
    </Box>
  );
};

FormAds.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  ads: PropTypes.object,
  reset: PropTypes.bool,
  edit: PropTypes.bool,
};

export default FormAds;
