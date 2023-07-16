import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import { oneLocation } from "actions/location";
import { useRouter } from "next/router";
import Device from "components/device/Device";
import Link from "next/link";

const SingleLocation = () => {
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
    let id = router.query.locationId;
    console.log(id);
    await oneLocation(id)
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
            console.log(data.totalCount);
            let totalCount = data.totalCount;
            // setTotalPages(Math.ceil(totalCount / limit));
            // setShow(false);
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
        <div className="mt-2 mr-2">
          <h2 className="text-gray-600 text-2xl mt-2 mb-2 font-semibold ">
            {allData && allData.location.locationName}
          </h2>
          <div className="pr-2">
            <div className="grid grid-cols-3 gap-4 mt-1 mb-1">
              <h2 className="col-span-1 bg-gray-200 p-3 rounded-lg font-bold text-gray-600 text-xl">
                Address
              </h2>
              <p className="col-span-2 bg-gray-200 p-3 rounded-lg font-bold text-gray-600 text-xl">
                {allData && allData.location.address}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-1 mb-1">
              <h2 className="col-span-1 bg-gray-200 p-3 rounded-lg font-bold text-gray-600 text-xl">
                Phone NUmber
              </h2>
              <p className="col-span-2 bg-gray-200 p-3 rounded-lg font-bold text-gray-600 text-xl">
                {allData && allData.location.phone}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-1 mb-1">
              <h2 className="col-span-1 bg-gray-200 p-3 rounded-lg font-bold text-gray-600 text-xl">
                Assigned Device Count
              </h2>
              <p className="col-span-2 bg-gray-200 p-3 rounded-lg font-bold text-gray-600 text-xl">
                {allData && allData.devices.length}
              </p>
            </div>
          </div>
          {allData && allData.location && (
            <div className="flex justify-center mt-3">
              <button
                className="p-3 font-bold text-xl text-white bg-blue-300 rounded-lg hover:bg-blue-500"
                href={`/devices/fromLocation/${allData.location._id}`}
                onClick={() => {
                  router.push({
                    pathname: `/devices/fromLocation/${allData.location._id}`,
                    query: {
                      locationId: allData.location._id,
                      locationName: allData.location.locationName,
                    },
                  });
                }}
              >
                Create Device For This Location
              </button>
            </div>
          )}
          <div>
            <h2 className="text-gray-600 text-2xl mt-2 mb-2 font-semibold ">
              Devices List
            </h2>

            <div className="mt-2 mr-4 md:mr-10 border-2 border-gray-200 rounded-xl">
              <div className="grid   grid-cols-10 md:grid-cols-7 bg-primary-400 p-4 rounded-xl text-white text-xl font-sb ">
                <h2 className="hidden md:block">Image</h2>
                <h2>Serial Number</h2>
                {/* <h2 className="hidden md:block">Email</h2>
            <h2>Role</h2> */}
                <h2>Status</h2>
                <h2>Type</h2>
                <h2 className="text-center col-span-2 md:col-span-1 mr-2 md:mr-0">
                  Remove
                </h2>
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
                  allData.devices &&
                  allData.devices.map((device) => {
                    return <Device device={device} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SingleLocation;
