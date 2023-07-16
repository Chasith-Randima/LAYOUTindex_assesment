import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import { getCookie } from "actions/auth";
import { allDevices } from "actions/device";
import Message from "components/Message";
import Device from "components/device/Device";

const AllDevices = () => {
  const [allData, setAllData] = useState();
  const [show, setShow] = useState(false);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  console.log(getCookie("token_user"));

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };
  const initialSet = () => {
    setAllData(data);
  };

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setFilters({ ...filters, [name]: e.target.value });
  };

  // ---------------pagination--------------------------
  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > totalPages) {
        nextPage = 1;
      }
      return nextPage;
    });
  };
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage <= 1) {
        prevPage = totalPages;
      }
      return prevPage;
    });
  };

  // ---------------pagination--------------------------

  useEffect(() => {
    console.log("page changed...", page);

    handleSubmit();
    // console.log(allData);
  }, [page]);

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    let params;
    setAlert({ ...alert, loading: true });

    params = {
      limit,
      page,
    };

    let token = getCookie("token_user");

    await allDevices(params)
      .then((data) => {
        console.log(data);
        if (data.status && data.status == "success") {
          if (data.results == 0) {
            setAlert({
              ...alert,
              loading: false,
              message: data.message,
              error: false,
              success: true,
            });

            window.setTimeout(() => {
              resetAlert();
            }, 1000);
          } else {
            setAllData(data);
            console.log(data.totalCount);
            let totalCount = data.totalCount;
            setTotalPages(Math.ceil(totalCount / limit));
            setShow(false);
          }
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });

          window.setTimeout(() => {
            resetAlert();
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);

        setAlert({
          ...alert,
          loading: false,
          message: err.message,
          error: true,
          success: false,
        });
      });
  };

  return (
    <>
      <Layout>
        <div className="flex justify-center">
          {alert.error && (
            <Message message={alert.message} resetAlert={resetAlert} />
          )}
          {alert.success && (
            <Message message={alert.message} resetAlert={resetAlert} />
          )}
          {alert.loading && (
            <Message
              message={"Loading...Please Waite..."}
              resetAlert={resetAlert}
            />
          )}
        </div>

        <h2 className="text-gray-600 text-2xl mt-2 font-semibold ">
          All Devices
        </h2>
        <div className="mt-2 mr-4 md:mr-10 border-2 border-gray-200 rounded-xl">
          <div className="grid   grid-cols-10 md:grid-cols-6 bg-primary-400 p-4 rounded-xl text-white text-xl font-sb ">
            <h2 className="hidden md:block">Image</h2>
            <h2>Serial Number</h2>
            <h2>Status</h2>
            <h2>Type</h2>
            <h2 className="text-center col-span-2 md:col-span-1 mr-2 md:mr-0">
              Update
            </h2>
            <h2 className="text-center col-span-2 md:col-span-1 ml-2 md:ml-0">
              Delete
            </h2>
          </div>
          <div className="">
            {console.log(allData)}
            {allData &&
              allData.devices.map((device) => {
                return <Device device={device} all={true} />;
              })}
          </div>
        </div>

        {/* --------------------------pagination----------------------- */}
        <div
          aria-label="Page navigation example"
          className="flex justify-center mt-10"
        >
          <ul className="inline-flex -space-x-px">
            <li>
              <a
                href="#"
                onClick={prevPage}
                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            {[...Array(totalPages)].map((val, index) => {
              // console.log(index);
              return (
                // <li>
                <li key={index}>
                  <a
                    href="#"
                    onClick={() => setPage(index + 1)}
                    className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {index + 1}
                  </a>
                </li>
              );
            })}

            <li>
              <a
                href="#"
                onClick={nextPage}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </div>
        {/* --------------------------pagination----------------------- */}
      </Layout>
    </>
  );
};

export default AllDevices;
