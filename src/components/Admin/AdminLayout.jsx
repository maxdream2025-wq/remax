import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Body from "./Body";

const AdminLayout = ({ logout }) => {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  return (
    <div className="d-flex vh-100">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="flex-grow-1 d-flex flex-column">
        <Topbar logout={logout} />
        <div className="flex-grow-1 overflow-auto bg-white">
          <Body activeMenu={activeMenu} />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
