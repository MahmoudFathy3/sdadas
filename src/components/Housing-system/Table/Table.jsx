import PropTypes from "prop-types";
import "./Table.module.css";

const Table = ({ Column, children }) => {
  return (
    <table>
      <thead>
        <tr>
          {Column.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

Table.propTypes = {
  Column: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node,
};

export default Table;
