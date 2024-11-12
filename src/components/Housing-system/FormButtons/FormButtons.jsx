import PropTypes from "prop-types";
import styles from "@styles/forms.module.css";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const FormButtons = ({ onReset, edit, isLoading, state }) => {
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1, {
      state: state,
    });
  };

  return (
    <div className={styles.form_buttons}>
      <button type="submit" disabled={isLoading}>
        {isLoading ? <Loading /> : edit ? "حفظ" : "إضافة"}
      </button>
      <button type="reset" onClick={onReset || onBack}>
        إلغاء
      </button>
    </div>
  );
};

FormButtons.propTypes = {
  onReset: PropTypes.func,
  edit: PropTypes.bool,
  isLoading: PropTypes.bool,
  state: PropTypes.any,
};

export default FormButtons;
