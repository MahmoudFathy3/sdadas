import styles from "./Modals.module.css";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";

const Modals = ({ open, handleClose, children, width }) => {
  useEffect(() => {
    if (open) {
      document.querySelector(".main-content").classList.add("fixed");
    } else {
      document.querySelector(".main-content").classList.remove("fixed");
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={styles.Modal}
    >
      <Box
        component={"div"}
        className={styles.Modal_content}
        style={{ width: width }}
      >
        {children}
      </Box>
    </Modal>
  );
};

Modals.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
};

export default Modals;
