import styles from "./Header.module.css";
import PropTypes from "prop-types";
import { MdOutlineMenuOpen } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { IconButton } from "@mui/material";
import Avatar from "@assets/images/Avatar.jpg";
import { UserData } from "@utils/UserData";

const Header = ({ openSidebar }) => {
  const User = UserData();


  return (
    <header className={styles.Header}>
      <div className={styles.header_wapper}>
        <IconButton onClick={openSidebar} className={styles.iconMenu}>
          <MdOutlineMenuOpen size={50} />
        </IconButton>

        <div className={styles.header_info}>
          <IconButton>
            <div className={styles.Notification}>
              <IoNotificationsOutline size={25} />
              <span>3</span>
            </div>
          </IconButton>
          <div className={styles.infoUser}>
            <div className={styles.infoUser_title}>
              <h4>{User?.fullName}</h4>
              <span>Founder</span>
            </div>
            <img src={Avatar} loading="lazy" alt="Avatar" />
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  openSidebar: PropTypes.func.isRequired,
};

export default Header;
