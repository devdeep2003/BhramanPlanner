// src/Layout.jsx

import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <Toaster />
      <Outlet /> {/* This is where the child routes render */}
      <Footer />
    </>
  );
};

export default Layout;
