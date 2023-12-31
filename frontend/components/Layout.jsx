import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

import { isMobile, isBrowser } from "react-device-detect";

const Layout = ({ children }) => {
  const [always, setAlways] = useState(true);
  const [showSideBar, setShowSideBar] = useState(true);
  const [noUser, setNoUser] = useState(true);

  console.log(showSideBar);
  useEffect(() => {
    if (isBrowser) {
      setAlways(true);
      setShowSideBar(true);
    } else if (isMobile) {
      setAlways(false);
      setShowSideBar(false);
    }
    if (localStorage.getItem("user")) {
      setNoUser(true);
    } else {
      setNoUser(false);
    }
  }, [isMobile, isBrowser]);
  return (
    <>
      <Navbar setSideBar={setShowSideBar} showSideBar={showSideBar} />
      <div className="grid grid-cols-12 md:w-full ml-5 md:ml-0">
        {/* {noUser && ( */}
        <div
          className={`${
            always && showSideBar
              ? "hidden md:block md:col-span-3 bg-white m-5 border-r-2"
              : `${
                  showSideBar
                    ? "  col-span-12 bg-white m-5 md:border-r-2 mr-10"
                    : "hidden md:col-span-3 bg-white m-5 border-r-2"
                }`
          } `}
        >
          <Sidebar />
        </div>
        {/* )} */}

        <div
          className={`${
            always && showSideBar
              ? "col-span-12 md:col-span-9 mb-10"
              : `${
                  showSideBar
                    ? "hidden col-span-12 md:col-span-9 mb-10"
                    : "col-span-12 md:col-span-9 mb-10"
                }`
          }`}
        >
          {children}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Layout;
