import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Body from "./Body";

const AdminLayout = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  return (
    <div className="d-flex vh-100">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="flex-grow-1 d-flex flex-column">
        <Topbar />
        <div className="flex-grow-1 overflow-auto">
          <Body activeMenu={activeMenu} />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
