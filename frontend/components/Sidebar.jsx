import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { isAuth } from "../actions/auth";
import { useRouter } from "next/router";
import SidebarLink from "./SidebarLink";
import { isMobile, isBrowser } from "react-device-detect";
import { logOut } from "actions/auth";

const Sidebar = ({ showSideBar }) => {
  const [patientId, setPatientId] = useState();
  const [doctorId, setDoctorId] = useState();
  const [userId, setUserId] = useState();
  const [userData, setUserData] = useState();
  const [logInShow, setLogInShow] = useState();

  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUserId(JSON.parse(localStorage.getItem("user"))._id);
      setUserData(JSON.parse(localStorage.getItem("user")));
    }

    setLogInShow(isMobile);
  }, [isMobile]);
  // console.log(router.asPath);
  // console.log(router.asPath == "/mainPage");

  const handleLogout = async (func) => {
    await func()
      .then((data) => {
        console.log(data);
        if (router.asPath == "/") {
          router.reload();
        } else {
          router.push("/");
        }
        // Router.replace(Router.asPath);
      })
      .catch((err) => {
        console.log();
      });
  };

  const userSidebar = () => {
    return (
      <div className="md:mr-10 ">
        <SidebarLink link={"/main"} title={"All Locations"} />
        <SidebarLink link={"/devices/allDevices"} title={"All Devices"} />
        <SidebarLink
          link={"/locations/createLocation"}
          title={"Create Location"}
        />
        <SidebarLink link={"/devices/createDevice"} title={"Create Device"} />
      </div>
    );
  };

  return (
    <>
      <h2 className="text-gray-400 text-xl font-semibold my-3 md:my-1">
        Dashboard
      </h2>

      {userId && userSidebar()}
    </>
  );
};

export default Sidebar;
