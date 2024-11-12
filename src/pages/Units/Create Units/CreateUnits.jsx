import Success from "@components/feedback/Success/Success";
import Loading from "@components/Housing-system/Loading/Loading";
import PathName from "@components/Housing-system/PathName/PathName";
import { Button, IconButton } from "@mui/material";
import { CreateUnitsPatchAsync } from "@store/reducers/Units/UnitsSlice";
import styles from "@styles/Page.module.css";
import { CheckRoles } from "@utils/CheckRoles";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

const CreateUnits = () => {
  const [success, setSuccess] = useState("");
  const [units, setUnits] = useState([]);
  const [Floor, setFloor] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useOutletContext();

  const { state } = useLocation();
  const { isLoading } = useSelector((state) => state.units);

  useEffect(() => {
    if (state) {
      for (let i = 0; i < state?.buildForComplexe.totalFloor; i++) {
        if (Floor?.find((floor) => floor.Floor === `الطابق - ${[i + 1]}`))
          return;
        setFloor((prev) => [...prev, { Floor: `الطابق - ${[i + 1]}` }]);
      }
    }
  }, [state, Floor]);

  useEffect(() => {
    let PerFloor = [];

    for (let f = 0; f < state?.buildForComplexe.unitPerFloor; f++) {
      PerFloor.push({
        nameOfBuilding: state.buildForComplexe.buildingName,
        numberOfUnit: f + 1,
      });
    }

    Floor?.length > 0 &&
      Floor?.map((floor, index) => {
        if (
          units?.length > 0 &&
          units?.find((unit) => unit.Floor === floor.Floor)
        )
          return;

        return setUnits((prev) => {
          return [
            ...prev,
            {
              numberOfBuilding: index + 1,
              Floor: floor.Floor,
              PerFloor: PerFloor,
            },
          ];
        });
      });
  }, [units, Floor, state]);

  const FliterPerFloor = (unit_index, perFloor_index) => {
    let temp = units[unit_index].PerFloor.filter(
      (per, idx) => idx !== perFloor_index
    );

    units[unit_index].PerFloor = temp;

    setUnits((prev) => [...prev]);
  };

  const createUnits = () => {
    let lists = [];
    units.map((unit) =>
      unit.PerFloor.map((pre) => {
        return lists.push(
          `${pre.nameOfBuilding}-${unit.numberOfBuilding}-${pre.numberOfUnit}`
        );
      })
    );

    dispatch(
      CreateUnitsPatchAsync({
        managementId: state.managementId,
        buildingId: state.buildForComplexe.buildingId,
        units: lists,
      })
    )
      .unwrap()
      .then(() => {
        setSuccess("تم انشاء الوحدات");
      });
  };

  if (!CheckRoles("SuperAdmin")) {
    return <Navigate to={"*"} replace />;
  }

  return (
    <section>
      <Helmet>
        <title>{`${context} | Create Units `}</title>
      </Helmet>

      <PathName path="انشاء وحدة" name="" />

      <Success message={success} />

      <div className={styles.createUnits}>
        <h3>مبني {state.buildForComplexe.buildingName}</h3>

        <div className={styles.createUnits_content}>
          {units?.length < 1 && (
            <div style={{ textAlign: "center" }}>
              <Loading color="#333" />
            </div>
          )}

          {units?.length > 0 &&
            units?.map((unit, unit_index) => (
              <div key={unit_index} className={styles.content_unit}>
                <div className={styles.unitTitle}>
                  <h4>{unit.Floor}</h4>
                </div>
                <div className={styles.perFloor}>
                  {unit.PerFloor?.map((per, perFloor_index) => (
                    <div
                      key={perFloor_index}
                      className={styles.perFloor_content}
                    >
                      <div
                        className={styles.perFloor_item}
                        style={{ direction: "ltr" }}
                      >
                        {` ${per.numberOfUnit} - ${unit.numberOfBuilding} - ${per.nameOfBuilding} `}
                      </div>

                      <div className={styles.perFloor_item}>
                        {per.nameOfBuilding}
                      </div>
                      <div className={styles.perFloor_item}>
                        {unit.numberOfBuilding}
                      </div>
                      <div className={styles.perFloor_item}>
                        {per.numberOfUnit}
                      </div>
                      <IconButton
                        onClick={() =>
                          FliterPerFloor(unit_index, perFloor_index)
                        }
                      >
                        <MdDeleteOutline color="red" size={30} />
                      </IconButton>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          <div className={styles.buttons}>
            <Button variant="contained" onClick={createUnits}>
              انشاء وحدة {isLoading && <Loading />}
            </Button>
            <Button variant="contained" onClick={() => navigate(-1)}>
              الغاء
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateUnits;
