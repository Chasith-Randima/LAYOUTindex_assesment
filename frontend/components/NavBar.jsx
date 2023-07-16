import React from "react";
import { useState, useEffect } from "react";
import { logOut } from "actions/auth";

import Link from "next/link";
import { Router, useRouter } from "next/router";
import { FaBars } from "react-icons/fa";

const Navbar = ({ setSideBar, showSideBar }) => {
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const userLogout = () => {
    return (
      <>
        <div className="">
          {user.name} <span>logged in as : {user.role}</span>
        </div>
      </>
    );
  };

  const handleLogout = async (func) => {
    await func()
      .then((data) => {
        console.log(data);
        if (router.asPath == "/") {
          router.reload();
        } else {
          router.push("/");
        }
      })
      .catch((err) => {
        console.log();
      });
  };
  return (
    <>
      <nav className="w-full h-auto grid grid-cols-2 p-2 bg-primary-400 text-white gap-2">
        <div className=" font-bold text-xl w-1/3  rounded">
          <h2 className="w-full h-20 text-4xl mx-auto mt-4">Assesment</h2>
        </div>

        <div className="flex justify-end my-auto ">
          {user._id && (
            <>
              <div className="cursor-pointer hidden md:block mx-3 p-3 text-primary-500 font-semibold rounded bg-white hover:bg-primary-500 hover:text-white transition-all capitalize">
                {user.name.split(" ")[0]}{" "}
              </div>
              <div className=" hidden md:block mx-3 p-3 text-primary-500 font-semibold rounded bg-white hover:bg-primary-500 hover:text-white transition-all">
                <h2
                  onClick={() => handleLogout(logOut)}
                  className="cursor-pointer"
                >
                  LogOut
                </h2>
              </div>
            </>
          )}
          {!user._id && (
            <div className="cursor-pointer hidden md:block mx-3 p-3 text-primary-500 font-semibold rounded bg-white hover:bg-primary-500 hover:text-white transition-all">
              <Link href="/">LogIn</Link>
            </div>
          )}
          <div className="md:hidden" onClick={() => setSideBar(!showSideBar)}>
            <FaBars className="font-bold text-4xl cursor-pointer" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
