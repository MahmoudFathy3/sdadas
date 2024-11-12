import Header from "@components/common/Header/Header";
import Sidebar from "@components/common/Sidebar/Sidebar";
import { CheckRoles } from "@utils/CheckRoles";
import { UserData } from "@utils/UserData";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Navigate, Outlet } from "react-router-dom";

const MainLayouts = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const user = UserData();

  if (!user?.token) {
    return <Navigate to="/login" replace />;
  }

  console.log(user);
  
  // console.log(CheckRoles("Owner"));

  return (
    <div className="container">
      <Helmet>
        <title>Dashboard Housing | Home</title>
      </Helmet>
      <div className={`sidebar ${openSidebar ? "open" : ""}`}>
        <div className="overlay" onClick={() => setOpenSidebar(false)}></div>
        <Sidebar />
      </div>
      <div className="main-content">
        <Header openSidebar={() => setOpenSidebar(true)} />
        <Outlet context={"Dashboard Housing"} />
      </div>
    </div>
  );
};

export default MainLayouts;
