import { useEffect, useState } from "react";
import styles from "@styles/Page.module.css";
import ActionTable from "@components/Housing-system/ActionTable/ActionTable";
import PathName from "@components/Housing-system/PathName/PathName";
import Search from "@components/Housing-system/Search/Search";
import Table from "@components/Housing-system/Table/Table";
import { ColumnAds } from "@shared/ColumnTables";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAds, fetchAds } from "@store/reducers/Ads/AdsSlice";
import { fetchComplexes } from "@store/reducers/Complexes/ComplexeSlice";
import Tabel_Pagination from "@components/Housing-system/Table/Pagination/Pagination";
import Success from "@components/feedback/Success/Success";
import { Helmet } from "react-helmet";

const AdsList = () => {
  const [page, setPage] = useState(1);
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useOutletContext();

  const { ads } = useSelector((state) => state.ads);
  const { complexes } = useSelector((state) => state.complexes);

  useEffect(() => {
    dispatch(fetchAds(page));
    dispatch(fetchComplexes(page));
  }, [dispatch, page]);

  const detailsItem = (item) => {
    navigate(`/ads/list/${item.id}/details`, {
      state: item,
    });
  };

  const editItem = (item) => {
    navigate(`/ads/list/${item.id}/edit`, {
      state: item,
    });
  };

  const onDeleteItem = (id) => {
    dispatch(deleteAds(id))
      .unwrap()
      .then(() => {
        dispatch(fetchAds(page));
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
        <title>{`${context} | Ads List`}</title>
      </Helmet>

      <div className="section_content">
        <div className={styles.title}>
          <PathName path="القائمة" name="الاعلانات / " />
          <Search />
        </div>

        <Success message={success} />

        <div className={styles.Table}>
          <Table Column={ColumnAds}>
            {ads?.data?.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.title}</td>
                <td>
                  {
                    complexes?.data?.find(
                      (complexe) => complexe.id === row.managementId
                    ).name
                  }
                </td>
                <td>
                  <ActionTable
                    detailsItem={() => detailsItem(row)}
                    editItem={() => editItem(row)}
                    deleteItem={() => onDeleteItem(row.id)}
                  />
                </td>
              </tr>
            ))}
          </Table>
        </div>

        {/* Pagination */}
        <Tabel_Pagination
          page={page}
          last_page={ads?.totalPages}
          handlerPagination={setPage}
        />
      </div>
    </section>
  );
};

export default AdsList;
