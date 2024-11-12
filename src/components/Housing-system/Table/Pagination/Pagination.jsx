import PropTypes from "prop-types";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Tabel_Pagination = ({ handlerPagination, page, last_page }) => {
  return (
    <div style={{ paddingTop: "20px" }}>
      <Stack spacing={2}>
        <Pagination
          count={last_page}
          page={page}
          showFirstButton
          showLastButton
          color="primary"
          onChange={(e, value) => handlerPagination(value)}
        />
      </Stack>
    </div>
  );
};

Tabel_Pagination.propTypes = {
  page: PropTypes.number,
  last_page: PropTypes.number,
  handlerPagination: PropTypes.func,
};

export default Tabel_Pagination;
