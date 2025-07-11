import React from "react";
import { Outlet } from "react-router-dom";
import LeftSIdebar from "./LeftSIdebar";
const MainLayout = () => {
  return (
    <div>
      <LeftSIdebar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
