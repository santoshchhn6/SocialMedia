import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const Layout = () => {
  return (
    <div className=" text-gray-600">
      <Header />
      <div className=" min-h-[100vh] ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
