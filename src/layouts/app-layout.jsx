import Header from "@/components/header";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>

      <div className="p-10 text-center bg-gray-800 mt-10">
        Made by <Link to='https://threed-web-dev-portfolio.onrender.com'>LVS Sandeep Kumar</Link>
      </div>
    </div>
  );
};

export default AppLayout;
