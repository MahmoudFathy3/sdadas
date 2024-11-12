import PropTypes from "prop-types";

const Success = ({ message }) => {
  return (
    <div className="success">
      <p>{message}</p>
    </div>
  );
};

Success.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Success;
