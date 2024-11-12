import PropTypes from "prop-types";
import styles from "./Statistics.module.css";
import { TbTopologyComplex } from "react-icons/tb";
import { FaRegBuilding, FaUserAlt } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";

const Statistics = ({ data }) => {

  console.log(data);
  
  return (
    <div className={styles.Statistics}>
      <div className={styles.Stats_element}>
        <div className={styles.element_title}>
          <div className={styles.title_icon}>
            <TbTopologyComplex className={styles.icon} />
          </div>
          <h4>عدد المجمعات</h4>
        </div>

        <h3>{data?.countMangemt}</h3>
      </div>

      <div className={styles.Stats_element}>
        <div className={styles.element_title}>
          <div className={styles.title_icon}>
            <FaBuildingUser className={styles.icon} />
          </div>
          <h4>عدد المستخدمين</h4>
        </div>

        <h3>{data?.countUser}</h3>
      </div>

      <div className={styles.Stats_element}>
        <div className={styles.element_title}>
          <div className={styles.title_icon}>
            <FaRegBuilding className={styles.icon} />
          </div>
          <h4>عدد الوحدات</h4>
        </div>

        <h3>{data?.countUnit}</h3>
      </div>
      <div className={styles.Stats_element}>
        <div className={styles.element_title}>
          <div className={styles.title_icon}>
            <FaUserAlt className={styles.icon} size={23} />
          </div>
          <h4>عدد الاعلانات</h4>
        </div>

        <h3>{data?.countAds}</h3>
      </div>
    </div>
  );
};

Statistics.propTypes = {
  data: PropTypes.object,
};

export default Statistics;
