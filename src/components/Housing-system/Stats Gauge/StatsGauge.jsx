import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import PropTypes from "prop-types";

const StatsGauge = ({ value, width, height, color, fill }) => {
  const settings = {
    width: width || 130,
    height: height || 130,
    value: value,
  };

  return (
    <Gauge
      {...settings}
      innerRadius="70%"
      outerRadius="100%"
      cornerRadius="10%"
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 30,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: color,
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          // fill: theme.palette.text.disabled,
          fill: fill || "#e8e8e8",
        },
      })}
    />
  );
};

StatsGauge.propTypes = {
  value: PropTypes.number,
  color: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
};

export default StatsGauge;
