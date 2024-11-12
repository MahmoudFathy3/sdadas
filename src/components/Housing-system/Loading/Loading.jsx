import { RotatingLines } from "react-loader-spinner";
import PropTypes from "prop-types";

const Loading = ({ color }) => {
  return (
    <RotatingLines
      visible={true}
      height="30"
      width="30"
      strokeWidth="5"
      strokeColor={color ? color : "var(--text-white)"}
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

Loading.propTypes = {
  color: PropTypes.string,
};

export default Loading;
