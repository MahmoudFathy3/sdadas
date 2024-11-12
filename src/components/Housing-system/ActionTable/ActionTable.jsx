import styles from "./ActionTable.module.css";
import { IconButton } from "@mui/material";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline, MdOutlineVisibility } from "react-icons/md";
import PropTypes from "prop-types";

const ActionTable = ({ detailsItem, editItem, deleteItem, hide }) => {
  return (
    <div className={styles.ActionButtons}>
      {!hide && (
        <IconButton onClick={detailsItem}>
          <MdOutlineVisibility size={25} color="#1976b2" />
        </IconButton>
      )}
      <IconButton onClick={editItem}>
        <CiEdit size={25} color="darkgreen" />
      </IconButton>
      <IconButton onClick={deleteItem}>
        <MdDeleteOutline size={25} color="brown" />
      </IconButton>
    </div>
  );
};

ActionTable.propTypes = {
  detailsItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  hide: PropTypes.bool,
};
export default ActionTable;
