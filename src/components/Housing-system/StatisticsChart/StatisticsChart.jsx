import PropTypes from "prop-types";
import StatsGauge from "../Stats Gauge/StatsGauge";
import styles from "./StatisticsChart.module.css";

const StatisticsChart = ({ data }) => {
  return (
    <div className={styles.StatisticsChart}>
      <div className={styles.StatisticsChart_content}>
        <div className={styles.left}>
          <div className={styles.element_chart}>
            <div className={styles.chart} style={{ height: "20%" }}></div>
            <div className={styles.chart} style={{ height: "60%" }}></div>
            <div className={styles.chart} style={{ height: "30%" }}></div>
          </div>

          <div className={styles.element_info}>
            <div className={styles.info}>
              <div className={styles.circle}></div>
              <div className={styles.info_wapper}>
                <h3>المباني السكنية</h3>
                <h3>60%</h3>
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.circle}></div>
              <div className={styles.info_wapper}>
                <h3>المباني التجارية</h3>
                <p>30%</p>
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.circle}></div>
              <div className={styles.info_wapper}>
                <h3>المباني الادارية</h3>
                <p>20%</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.element_right}>
            <div className={styles.element_info}>
              <h4>عدد المجمعات</h4>
              <p>{data?.countMangemt}</p>
              <span>09.57%</span>
            </div>
            <div className={styles.StatsGauge}>
              <StatsGauge
                value={60}
                color="rgba(83, 210, 133, 1)"
                fill="rgba(225, 247, 232, 1)"
              />
            </div>
          </div>
          <div className={styles.element_right}>
            <div className={styles.element_info}>
              <h4>عدد الوحدات</h4>
              <p>{data?.countUnit}</p>
              <span>09.57%</span>
            </div>
            <div className={styles.StatsGauge}>
              <StatsGauge
                value={data?.countUnit}
                color="rgba(45, 46, 49, 1)"
                fill="rgba(214, 215, 215, 1)"
              />
            </div>
          </div>

          <div className={styles.element_right}>
            <div className={styles.element_info}>
              <h4>عدد المستخدمين</h4>
              <p>{data?.countUser}</p>
              <span>09.57%</span>
            </div>
            <div className={styles.StatsGauge}>
              <StatsGauge
                value={50}
                color="rgba(248, 192, 98, 1)"
                fill="rgba(253, 243, 225, 1)"
              />
            </div>
          </div>

          <div className={styles.element_right}>
            <div className={styles.element_info}>
              <h4>عدد الفواتير</h4>
              <p>{data?.countInvoice}</p>
              <span>06.57%</span>
            </div>
            <div className={styles.StatsGauge}>
              <StatsGauge
                value={90}
                color="rgba(62, 93, 184, 1)"
                fill="rgba(199, 206, 255, 1)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

StatisticsChart.propTypes = {
  data: PropTypes.object,
};

export default StatisticsChart;
