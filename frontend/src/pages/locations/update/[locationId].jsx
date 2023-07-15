import React, { useState, useEffect } from "react";
import Layout from "components/Layout";
import { updateLocation, oneLocation } from "actions/location";
import { getCookie } from "actions/auth";
import { useRouter } from "next/router";
import Message from "components/Message";
const UpdateLocation = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    locationName: "",
    address: "",
    phone: "",
  });

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  const { locationName, address, phone } = values;
  useEffect(() => {
    getLocation();
  }, [router]);

  const getLocation = async () => {
    let locationId = router.query.locationId;
    // console.log(deviceId);
    await oneLocation(locationId)
      .then((data) => {
        if (data.status && data.status == "success") {
          console.log(data.location.locationName);

          setValues({
            ...values,
            locationName: data.location.locationName,
            address: data.location.address,
            phone: data.location.phone,
          });

          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });
          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
          }, 1000);

          //   router.push(`/`);
        } else {
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
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
          message: err.message,
          error: true,
          success: false,
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert({ ...alert, loading: true });
    setValues({ ...values, loading: true, error: false });
    // console.log(values);
    const location = {
      locationName,
      address,
      phone,
    };
    let id = router.query.locationId;
    let token = getCookie("token_user");
    updateLocation(id, location, token)
      .then((data) => {
        if (data.status && data.status == "success") {
          console.log(data);
          setValues({
            ...values,
            locationName: "",
            address: "",
            phone: "",
          });
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });
          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
          }, 1000);

          //   router.push(`/`);
        } else {
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
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
          message: data.message,
          error: true,
          success: false,
        });
      });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  return (
    <Layout>
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
      <div className="m-5">
        <h2 className="text-gray-400 text-2xl mt-2 mb-2 font-semibold ">
          Create Location
        </h2>
        <form>
          <div className="grid grid-cols-3 mt-1 mb-1">
            <label className="col-span-1 p-2 rounded-lg mr-2 bg-gray-200 font-bold text-xl">
              Location Name
            </label>
            <input
              className="col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg"
              type="text"
              value={locationName}
              onChange={handleChange("locationName")}
              placeholder="Enter Location Name"
            />
          </div>
          <div className="grid grid-cols-3 mt-1 mb-1">
            <label className="col-span-1 p-2 rounded-lg mr-2 bg-gray-200 font-bold text-xl">
              Address
            </label>
            <input
              className="col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg"
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={handleChange("address")}
            />
          </div>
          <div className="grid grid-cols-3 mt-1 mb-1">
            <label className="col-span-1 p-2 rounded-lg mr-2 bg-gray-200 font-bold text-xl">
              Phone
            </label>
            <input
              className="col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg"
              type="text"
              placeholder="Enter Phone"
              value={phone}
              onChange={handleChange("phone")}
            />
          </div>
          <div className="flex justify-center mt-3">
            <button
              className="p-3 font-bold text-xl bg-blue-300 rounded-lg hover:bg-blue-500"
              onClick={handleSubmit}
            >
              Update Location
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateLocation;
