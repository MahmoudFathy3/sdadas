import { useState } from "react";
import styles from "./Sidebar.module.css";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaAngleDown, FaAngleLeft, FaRegBuilding } from "react-icons/fa";
import { RiGovernmentLine } from "react-icons/ri";
import { TbTopologyComplex, TbFileInvoice } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";
import {
  MdOutlineHomeRepairService,
  MdOutlineNotificationsActive,
  MdOutlineLogout,
} from "react-icons/md";
import { BiSolidUserBadge } from "react-icons/bi";
import { BsImageAlt } from "react-icons/bs";
import { LiaAdSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { createLogout } from "@store/reducers/Auth/LoginSlice";
import Loading from "@components/Housing-system/Loading/Loading";
import { CheckRoles } from "@utils/CheckRoles";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.login);

  // Toggle active item
  const DropMenu = (e) => {
    let menu = e.currentTarget.nextElementSibling;
    setActiveItem(e.currentTarget.dataset.active);

    // Hidden All Items in Menu
    document
      .querySelectorAll("[data-active]")
      .forEach((item) =>
        item.nextElementSibling != menu
          ? (item.nextElementSibling.style = ``)
          : ""
      );

    // Toggle Item Selected
    if (menu.style.maxHeight) {
      menu.style.maxHeight = null;
      menu.style.visibility = "hidden";
      menu.style.opacity = 0;
    } else {
      menu.style.maxHeight = menu.scrollHeight + "px";
      menu.style.visibility = "visible";
      menu.style.opacity = 1;
    }
  };

  // create logout
  const createLogOut = () => {
    dispatch(createLogout())
      .unwrap()
      .then(() => {
        navigate("/login", { replace: true });
      });
  };

  return (
    <div className={styles.Sidebar}>
      <div className={styles.logo}>
        <h3>Logo</h3>
      </div>
      <div className={styles.List}>
        <ul>
          <NavLink to={"/"} className={styles.isActive}>
            <AiOutlineDashboard size={25} />
            <li>لوحة التحكم</li>
            <FaAngleLeft className={styles.icon} />
          </NavLink>

          <p className={styles.title}>التطبيقات</p>
          {CheckRoles("SuperAdmin") && (
            <div
              data-active="complexes"
              className={`${styles.item} ${
                activeItem === "complexes" ? styles.active : ""
              }`}
              onClick={DropMenu}
            >
              <TbTopologyComplex size={25} />
              <li>المجمعات</li>
              {activeItem === "complexes" ? (
                <FaAngleDown className={styles.icon} />
              ) : (
                <FaAngleLeft className={styles.icon} />
              )}
            </div>
          )}

          <div className={styles.Dropdown}>
            <Link to={"/complexes/add"}>
              <p>اضافة</p>
            </Link>
            <Link to={"/complexes/list"}>
              <p>القائمة</p>
            </Link>
          </div>

          <div
            data-active="governorate"
            className={`${styles.item} ${
              activeItem === "governorate" ? styles.active : ""
            }`}
            onClick={DropMenu}
          >
            <RiGovernmentLine size={25} />
            <li>المحافظة</li>
            {activeItem === "governorate" ? (
              <FaAngleDown className={styles.icon} />
            ) : (
              <FaAngleLeft className={styles.icon} />
            )}
          </div>

          <div className={styles.Dropdown}>
            <Link to={"/governorate/add"}>
              <p>اضافة</p>
            </Link>
            <Link to={"/governorate/list"}>
              <p>القائمة</p>
            </Link>
          </div>

          <div
            data-active="Users"
            className={`${styles.item} ${
              activeItem === "Users" ? styles.active : ""
            }`}
            onClick={DropMenu}
          >
            <FiUsers size={25} />
            <li>المستخدمين</li>
            {activeItem === "Users" ? (
              <FaAngleDown className={styles.icon} />
            ) : (
              <FaAngleLeft className={styles.icon} />
            )}
          </div>

          <div className={styles.Dropdown}>
            <Link to={"/users/add"}>
              <p>اضافة</p>
            </Link>
            <Link to={"/users/list"}>
              <p>القائمة</p>
            </Link>
          </div>

          {CheckRoles("SuperAdmin") && (
            <>
              <div
                data-active="Buildings"
                className={`${styles.item} ${
                  activeItem === "Buildings" ? styles.active : ""
                }`}
                onClick={DropMenu}
              >
                <LuBuilding2 size={25} />
                <li>المباني</li>
                {activeItem === "Buildings" ? (
                  <FaAngleDown className={styles.icon} />
                ) : (
                  <FaAngleLeft className={styles.icon} />
                )}
              </div>
              <div className={styles.Dropdown}>
                <Link to={"/buildings/add"}>
                  <p>اضافة</p>
                </Link>
                <Link to={"/buildings/list"}>
                  <p>القائمة</p>
                </Link>
              </div>
            </>
          )}

          <div
            data-active="Units"
            className={`${styles.item} ${
              activeItem === "Units" ? styles.active : ""
            }`}
            onClick={DropMenu}
          >
            <FaRegBuilding size={25} />
            <li>الوحدات</li>
            {activeItem === "Units" ? (
              <FaAngleDown className={styles.icon} />
            ) : (
              <FaAngleLeft className={styles.icon} />
            )}
          </div>
          <div className={styles.Dropdown}>
            {/* <Link to={"/units/add"}>
              <p>اضافة</p>
            </Link> */}
            {CheckRoles("SuperAdmin") && (
              <Link to={"/units/management"}>
                <p>انشاء وحدة</p>
              </Link>
            )}

            <Link to={"/units/list"}>
              <p>القائمة</p>
            </Link>
          </div>

          {CheckRoles("ManagementOwner") && (
            <>
              <div
                data-active="services"
                className={`${styles.item} ${
                  activeItem === "services" ? styles.active : ""
                }`}
                onClick={DropMenu}
              >
                <MdOutlineHomeRepairService size={25} />
                <li>الخدمات</li>
                {activeItem === "services" ? (
                  <FaAngleDown className={styles.icon} />
                ) : (
                  <FaAngleLeft className={styles.icon} />
                )}
              </div>

              <div className={styles.Dropdown}>
                <Link to={"/services/add"}>
                  <p>اضافة</p>
                </Link>
                <Link to={"/services/list"}>
                  <p>القائمة</p>
                </Link>
              </div>
            </>
          )}

          <div
            data-active="Workers"
            className={`${styles.item} ${
              activeItem === "Workers" ? styles.active : ""
            }`}
            onClick={DropMenu}
          >
            <FiUsers size={25} />
            <li>العمال</li>
            {activeItem === "Workers" ? (
              <FaAngleDown className={styles.icon} />
            ) : (
              <FaAngleLeft className={styles.icon} />
            )}
          </div>
          <div className={styles.Dropdown}>
            <Link to={"/workers/add"}>
              <p>اضافة</p>
            </Link>
            <Link to={"/workers/list"}>
              <p>القائمة</p>
            </Link>
          </div>

          <div
            data-active="crafts"
            className={`${styles.item} ${
              activeItem === "crafts" ? styles.active : ""
            }`}
            onClick={DropMenu}
          >
            <MdOutlineHomeRepairService size={25} />
            <li>صانعة</li>
            {activeItem === "crafts" ? (
              <FaAngleDown className={styles.icon} />
            ) : (
              <FaAngleLeft className={styles.icon} />
            )}
          </div>

          <div className={styles.Dropdown}>
            <Link to={"/craft/add"}>
              <p>اضافة</p>
            </Link>
            <Link to={"/craft/list"}>
              <p>القائمة</p>
            </Link>
          </div>

          <div
            data-active="invoice"
            className={`${styles.item} ${
              activeItem === "invoice" ? styles.active : ""
            }`}
            onClick={DropMenu}
          >
            <TbFileInvoice size={25} />
            <li>الفواتير</li>
            {activeItem === "invoice" ? (
              <FaAngleDown className={styles.icon} />
            ) : (
              <FaAngleLeft className={styles.icon} />
            )}
          </div>
          <div className={styles.Dropdown}>
            <Link to={"/invoices/add"}>
              <p>اضافة</p>
            </Link>
            <Link to={"/invoices/list"}>
              <p>القائمة</p>
            </Link>
          </div>

          <div
            data-active="Complaints"
            className={`${styles.item} ${
              activeItem === "Complaints" ? styles.active : ""
            }`}
            onClick={DropMenu}
          >
            <BiSolidUserBadge size={25} />
            <li>الشكاوي</li>
            {activeItem === "Complaints" ? (
              <FaAngleDown className={styles.icon} />
            ) : (
              <FaAngleLeft className={styles.icon} />
            )}
          </div>
          <div className={styles.Dropdown}>
            {/* <Link to={"/complaints/add"}>
              <p>اضافة</p>
            </Link> */}
            <Link to={"/complaints/list"}>
              <p>القائمة</p>
            </Link>
          </div>

          {CheckRoles("SuperAdmin") && (
            <>
              <div
                data-active="ADS"
                className={`${styles.item} ${
                  activeItem === "ADS" ? styles.active : ""
                }`}
                onClick={DropMenu}
              >
                <LiaAdSolid size={25} />
                <li>الاعلانات</li>
                {activeItem === "ADS" ? (
                  <FaAngleDown className={styles.icon} />
                ) : (
                  <FaAngleLeft className={styles.icon} />
                )}
              </div>
              <div className={styles.Dropdown}>
                <Link to={"/ads/add"}>
                  <p>اضافة</p>
                </Link>

                <Link to={"/ads/list"}>
                  <p>القائمة</p>
                </Link>
              </div>
            </>
          )}

          {CheckRoles("ManagementOwner") && (
            <>
              <div
                data-active="Images"
                className={`${styles.item} ${
                  activeItem === "Images" ? styles.active : ""
                }`}
                onClick={DropMenu}
              >
                <BsImageAlt size={25} />
                <li>الصور</li>
                {activeItem === "Images" ? (
                  <FaAngleDown className={styles.icon} />
                ) : (
                  <FaAngleLeft className={styles.icon} />
                )}
              </div>

              <div className={styles.Dropdown}>
                <Link to={"/images/add"}>
                  <p>اضافة</p>
                </Link>
                <Link to={"/images/list"}>
                  <p>القائمة</p>
                </Link>
              </div>
            </>
          )}

          <div
            data-active="notifications"
            className={`${styles.item} ${
              activeItem === "notifications" ? styles.active : ""
            }`}
            onClick={DropMenu}
          >
            <MdOutlineNotificationsActive size={25} />
            <li>الاشعارات</li>
            {activeItem === "notifications" ? (
              <FaAngleDown className={styles.icon} />
            ) : (
              <FaAngleLeft className={styles.icon} />
            )}
          </div>
          <div className={styles.Dropdown}>
            <Link to={"/notifications/add"}>
              <p>اضافة</p>
            </Link>
            <Link to={"/notifications/list"}>
              <p>القائمة</p>
            </Link>
          </div>
        </ul>
      </div>
      <div className={styles.logout} onClick={createLogOut}>
        {isLoading && <Loading />}
        <button>تسجيل الخروج</button>
        <MdOutlineLogout size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
