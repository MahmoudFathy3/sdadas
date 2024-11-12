import { useEffect, useState } from "react";
import styles from "@styles/Page.module.css";
import ActionTable from "@components/Housing-system/ActionTable/ActionTable";
import Tabel_Pagination from "@components/Housing-system/Table/Pagination/Pagination";
import Table from "@components/Housing-system/Table/Table";
import Success from "@components/feedback/Success/Success";
import PathName from "@components/Housing-system/PathName/PathName";
import Search from "@components/Housing-system/Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { deleteCraft, fetchCrafts } from "@store/reducers/Crafts/CraftsSlice";
import { Helmet } from "react-helmet";
import { fetchComplexes } from "@store/reducers/Complexes/ComplexeSlice";

const CraftsList = () => {
  const [page, setPage] = useState(1);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { crafts } = useSelector((state) => state.crafts);
  const { complexes } = useSelector((state) => state.complexes);

  useEffect(() => {
    dispatch(fetchCrafts({ page }));
    dispatch(fetchComplexes(0));
  }, [dispatch, page]);

  const detailsItem = (item) => {
    navigate(`/craft/list/${item.id}/details`, {
      state: item,
    });
  };

  const editItem = (item) => {
    navigate(`/craft/list/${item.id}/edit`, {
      state: item,
    });
  };

  const onDelete = (id) => {
    dispatch(deleteCraft(id))
      .unwrap()
      .then(() => {
        dispatch(fetchCrafts({ page }));
        setSuccess("تم الحذف بنجاح");
      });
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }
  }, [success]);

  return (
    <section>
      <Helmet>
        <title>{`${context} | Crafts List`}</title>
      </Helmet>

      <div className="section_content">
        <div className={styles.title}>
          <PathName path="القائمة" name="الصناعة / " />
          <Search />
        </div>

        <Success message={success} />

        {/* <div style={{ width: "300px", margin: "40px 0px 20px" }}>
          <Complexe
            id="complexe"
            label="اسم المجمع"
            setState={setManagementId}
          />
        </div> */}

        <div className={styles.Table}>
          <Table Column={["#", "اسم الصنعة", "اسم المجمع", "الحدث"]}>
            {crafts?.data?.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>
                  {
                    complexes?.data?.find(
                      (complexe) => complexe.id === row.managementId
                    )?.name
                  }
                </td>
                <td>
                  <ActionTable
                    hide={true}
                    detailsItem={() => detailsItem(row)}
                    editItem={() => editItem(row)}
                    deleteItem={() => onDelete(row.id)}
                  />
                </td>
              </tr>
            ))}
          </Table>
        </div>

        {/* Pagination  */}
        <Tabel_Pagination
          page={page}
          last_page={crafts.totalPages}
          handlerPagination={setPage}
        />
      </div>
    </section>
  );
};

export default CraftsList;
