import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import { oneDevice } from "actions/device";
import { useRouter } from "next/router";

const SingleDevice = () => {
  const router = useRouter();
  const [allData, setAllData] = useState();

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  useEffect(() => {
    fetchData();
  }, [router]);

  const fetchData = async () => {
    let id = router.query.deviceId;
    console.log(id);
    await oneDevice(id)
      .then((data) => {
        console.log(data, "fetched.........................");
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
        <div className=" mr-2">
          <h2 className="text-gray-600 text-2xl mt-2 mb-2 font-semibold ">
            {allData && allData.device.serialNumber}
          </h2>
          <div className="grid grid-cols-4">
            {allData && allData.device.images && (
              <img
                src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/devices/image/${allData.device.images[0]}`}
                className="col-span-2  h-30 rounded-xl"
              />
            )}

            <div className="col-span-2 ml-2 mr-2">
              <div className="grid grid-cols-3 gap-4 mt-1 mb-1">
                <h2 className="col-span-1 bg-gray-200 p-3 rounded-lg font-bold text-gray-600 text-xl">
                  Serial Number
                </h2>
                <p className="col-span-2 bg-gray-200 p-3 rounded-lg font-bold text-gray-600 text-xl">
                  {allData && allData.device.serialNumber}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-1 mb-1">
                <h2 className="col-span-1 bg-gray-200 p-3 rounded-lg font-bold text-gray-600 text-xl">
                  Status
                </h2>
                <p className="col-span-2 bg-gray-200 p-3 rounded-lg font-bold text-gray-600 text-xl">
                  {allData && allData.device.status}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-1 mb-1">
                <h2 className="col-span-1 bg-gray-200 p-3 rounded-lg font-bold text-gray-600 text-xl">
                  Type
                </h2>
                <p className="col-span-2 bg-gray-200 p-3 rounded-lg font-bold text-gray-600 text-xl">
                  {allData && allData.device.type}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SingleDevice;
