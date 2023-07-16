import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      {/* <!-- copyright --> */}
      <footer className="bg-white pt-16 pb-12 border-t border-gray-100">
        <div className="container">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            {/* <!-- footer text --> */}
            <div className="xl:col-span-3  space-y-8 text-center">
              {/* <img src="./images/logo.svg" alt="" className="w-30" /> */}
              <Link
                href="/"
                className="font-bold text-2xl text-gray-500 hover:text-primary transition"
              >
                {process.env.NEXT_PUBLIC_APP_NAME}
                {/* <img
              src="./images/icons/icons8-duolingo-logo.svg"
              className="w-22 h-15"
            /> */}
              </Link>
              {/* <p className="text-gray-500 text-base">
                Garbage collecting app.Made with love of NSBM.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
              </div> */}
            </div>

            {/* <!-- footer links --> */}
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2"></div>
          </div>
        </div>
      </footer>
      <div className="bg-gray-800 py-4">
        <div className="container flex justify-center items-center">
          <p className="text-white">Randiam Silva - All Rights reserved</p>
          {/* <img
            src="./images/icons/hd-visa-mastercard-paypal-payment-methods-logos-png-21635415866zngy8aj06k.png"
            alt=""
            className="h-5"
          /> */}
        </div>
      </div>
    </>
  );
};

export default Footer;
