import { useEffect, useState } from "react";
import styles from "@styles/Page.module.css";
import PathName from "@components/Housing-system/PathName/PathName";
import Statistics from "@components/Housing-system/Statistics/Statistics";
import StatisticsChart from "@components/Housing-system/StatisticsChart/StatisticsChart";
import Table from "@components/Housing-system/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomes } from "@store/reducers/Home/HomeSlice";
import { Helmet } from "react-helmet";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const [row, setRow] = useState([
    {
      id: 1,
      complexes: "المستقبل",
      governorate: "القليوبية",
      mobile: "01230889202",
      email: "Omer@gmail.com",
      address: "شبين القناطر",
      active: "نشاط",
    },
    {
      id: 2,
      complexes: "المستقبل",
      governorate: "القليوبية",
      mobile: "01230889202",
      email: "Omer@gmail.com",
      address: "شبين القناطر",
      active: "نشاط",
    },
    {
      id: 3,
      complexes: "المستقبل",
      governorate: "القليوبية",
      mobile: "01230889202",
      email: "Omer@gmail.com",
      address: "شبين القناطر",
      active: "نشاط",
    },
  ]);

  const context = useOutletContext();
  const dispatch = useDispatch();
  const { homes } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchHomes());
  }, [dispatch]);

  return (
    <section>
      <Helmet>
        <title>{`${context} | Home`}</title>
      </Helmet>

      <div className="section_content">
        <PathName name="لوحة التحكم" />

        <Statistics data={homes?.data} />
        <StatisticsChart data={homes?.data} />
        <div
          className={styles.Table}
          style={{ boxShadow: "var(--shadow-secondary)" }}
        >
          <Table
            Column={[
              "#",
              "اسم المجمع",
              "المحافظة",
              "المدينة",
              "قضاء",
              "عدد الوحدات",
              "رقم الهاتف",
            ]}
          >
            {row.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.complexes}</td>
                <td>{item.governorate}</td>
                <td>{item.address}</td>
                <td>{item.active}</td>
                <td>12</td>
                <td>{item.mobile}</td>
              </tr>
            ))}
          </Table>
        </div>
      </div>
    </section>
  );
};

export default Home;
