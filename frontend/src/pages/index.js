import React from "react";
import { useState, useEffect } from "react";
import { logIn, authenticate, getCookie } from "../../actions/auth";
import Router from "next/router";
import Link from "next/link";
import Message from "components/MessageAuth";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

const LogIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const [tempError, setTempError] = useState(false);
  useEffect(() => {
    if (getCookie("token_user")) {
      Router.push(`/`);
    }
  }, []);

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  const { email, password, error, loading, message, showForm } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !values.email ||
      values.email.length <= 0 ||
      !values.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setTempError(true);
      return;
    }
    if (!values.password || values.password.length <= 0) {
      setTempError(true);
      return;
    }
    setAlert({ ...alert, loading: true });
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    await logIn(user)
      .then((data) => {
        // console.log(data);
        if (data.status && data.status == "success") {
          data.data.token = data.token;
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });
          setTempError(false);
          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
          }, 1500);

          // console.log(data);
          // console.log(data.error);
          authenticate(data.data, "user", () => {
            if (localStorage.getItem("user")) {
              Router.push(`/main`);
            }
          });
        } else {
          setAlert({
            ...alert,
            loading: false,
            message: "Check Your credentials...",
            error: true,
            success: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          ...alert,
          loading: false,
          message: "check your credentials...",
          error: true,
          success: false,
        });
      });
  };

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  return (
    <>
      {/* <Layout> */}
      {/* <!-- Login --> */}
      {alert.error && (
        <Message
          message={alert.message}
          // alert={"error"}
          resetAlert={resetAlert}
        />
      )}
      {alert.success && (
        <Message
          message={alert.message}
          // alert={"success"}
          resetAlert={resetAlert}
        />
      )}
      {alert.loading && (
        <Message
          message={"Loading...Please Waite..."}
          // alert={"loading"}
          resetAlert={resetAlert}
        />
      )}
      <div className="flex flex-row md:flex-col items-center justify-center min-h-screen py-2 bg-white-100">
        <div className="flex flex-row md:flex-col items-center justify-center md:w-full flex-2 md:px-20 text-center">
          <div className="bg-blue rounded-2xl shadow-2xl md:flex md:w-2/3 md:max-w-4xl">
            <div className="md:w-3/5 p-5">
              <div className="md:py-10">
                <h2 className="text-3xl font-bold text-primary-500 mb-2">
                  Log In to Account
                </h2>
                <div className="border-2 w-10 border-primary-500 inline-block mb-2"></div>
                <div>
                  <p>
                    You can use following pre created account credentials to
                    login.Otherwise you can signup and login
                  </p>
                  <h3>
                    Email : <span>admin@gmail.com</span>
                  </h3>
                  <h3>
                    Password : <span>1234567890</span>
                  </h3>
                </div>

                <div className="flex mt-10 flex-col items-center">
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <FaRegEnvelope className="text-gray-400 m-2" />
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange("email")}
                      placeholder="Email"
                      className="bg-gray-100 outline-none text-sm"
                    />
                  </div>
                  {tempError &&
                    !email
                      ?.toLowerCase()
                      .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                      ) && (
                      <div className="flex justify-center mb-2 pl-2 pr-2 border-red-500 border-2 rounded-lg ">
                        <h2 className="text-red-500 ">
                          Please enter a valid email
                        </h2>
                      </div>
                    )}
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <MdLockOutline className="text-gray-400 m-2" />
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleChange("password")}
                      placeholder="Password"
                      className="bg-gray-100 outline-none text-sm"
                    />
                  </div>
                  {tempError && password?.length <= 0 && (
                    <div className="flex justify-center col-span-3 border-red-500 border-2 rounded-lg mt-1 mb-1">
                      <h2 className="text-red-500 ">Please Enter a Password</h2>
                    </div>
                  )}
                  {tempError && password?.length < 8 && (
                    <div className="flex justify-center col-span-3 border-red-500 border-2 rounded-lg mt-1 mb-1">
                      <h2 className="text-red-500 ">
                        Please must at least contain 8 charactors
                      </h2>
                    </div>
                  )}

                  <button
                    onClick={handleSubmit}
                    className=" mt-5 border-2 border-primary-500 text-primary-500 rounded-full px-11 py-1 font-semibold hover:bg-primary-500 hover:text-white"
                  >
                    LogIn
                  </button>
                </div>
              </div>
            </div>

            <div className="md:w-2/5 bg-primary-500 text-blue rounded-tr-2xl rounded-br-2xl md:py-36 md:px-16 pb-4 ">
              <h2 className="item-center item font-bold text-2xl text-white">
                LAYOUTindex
              </h2>
              <div className="border-2 w-10 border-blue inline-block mb-2"></div>
              <p className="mb-2 text-base text-white">
                <b>Assesment</b>
              </p>
              <br />
              <p className="mb-2 text-white">Don't have an account?</p>
              <Link
                href={`/auth/SignUp`}
                className="border-2 border-blue text-white rounded-full px-11 py-1 font-semibold hover:bg-blue hover:text-white hover:bg-blue-400"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
