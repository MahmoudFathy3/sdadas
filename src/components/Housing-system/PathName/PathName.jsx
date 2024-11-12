import PropTypes from "prop-types";
import styles from "./PathName.module.css";

const PathName = ({ path, name }) => {
  return (
    <div className={styles.PathName}>
      <h3>{name}</h3>
      <span>{path}</span>
    </div>
  );
};

PathName.propTypes = {
  path: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default PathName;
