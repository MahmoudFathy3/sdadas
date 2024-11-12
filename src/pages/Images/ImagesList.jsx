import { useEffect, useState } from "react";
import styles from "@styles/Page.module.css";
import ActionTable from "@components/Housing-system/ActionTable/ActionTable";
import PathName from "@components/Housing-system/PathName/PathName";
import Search from "@components/Housing-system/Search/Search";
import Table from "@components/Housing-system/Table/Table";
import { ColumnImages } from "@shared/ColumnTables";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchImages } from "@store/reducers/Image/ImageSlice";
import { Helmet } from "react-helmet";
import { fetchComplexes } from "@store/reducers/Complexes/ComplexeSlice";
import Tabel_Pagination from "@components/Housing-system/Table/Pagination/Pagination";
import { CheckRoles } from "@utils/CheckRoles";

const ImagesList = () => {
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useOutletContext();

  const { images } = useSelector((state) => state.images);
  const { complexes } = useSelector((state) => state.complexes);

  useEffect(() => {
    dispatch(fetchImages(page));
    dispatch(fetchComplexes(0));
  }, [dispatch, page]);

  const detailsItem = (item) => {
    navigate(`/images/list/${item.id}/details`, {
      state: item,
    });
  };

  const editItem = (item) => {
    navigate(`/images/list/${item.id}/edit`, {
      state: item,
    });
  };

  if (!CheckRoles("ManagementOwner")) {
    return <Navigate to={"*"} replace />;
  }

  return (
    <section>
      <Helmet>
        <title>{`${context} | Images List`}</title>
      </Helmet>

      <div className="section_content">
        <div className={styles.title}>
          <PathName path="القائمة" name="الصور / " />
          <Search />
        </div>

        <div className={styles.Table}>
          <Table Column={ColumnImages}>
            {images?.data?.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>
                  {
                    complexes?.data?.find(
                      (complexe) => complexe.id === row.managementId
                    )?.name
                  }
                </td>
                <td>
                  <img
                    src={`${import.meta.env.VITE_WEBSITE_API_URL_image}/${
                      row.imageInSliders[0].imageUrl
                    }`}
                    alt="Slider_Image"
                    loading="lazy"
                    width={80}
                    height={80}
                  />
                </td>
                <td>
                  <ActionTable
                    detailsItem={() =>
                      detailsItem({
                        managementId: complexes?.data?.find(
                          (complexe) => complexe.id === row.managementId
                        )?.name,

                        row,
                      })
                    }
                    editItem={() => editItem(row)}
                    deleteItem={() => ""}
                  />
                </td>
              </tr>
            ))}
          </Table>
        </div>

        {/* Pagination  */}
        <Tabel_Pagination
          page={page}
          last_page={images.totalPages}
          handlerPagination={setPage}
        />
      </div>
    </section>
  );
};

export default ImagesList;
