import React, { useState, useEffect } from "react";
import Layout from "components/Layout";
import { createLocation } from "actions/location";
import { getCookie } from "actions/auth";
import Message from "components/Message";

const CreateLocation = () => {
  const [values, setValues] = useState({
    locationName: "",
    address: "",
    phone: "",
  });

  const [error, setError] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!values.locationName || values.locationName.length <= 0) {
      setError(true);
      return;
    }
    if (!values.address || values.address.length <= 0) {
      setError(true);
      return;
    }
    if (!values.phone || values.phone.length <= 9) {
      setError(true);
      return;
    }
    setAlert({ ...alert, loading: true });
    setValues({ ...values, loading: true, error: false });
    const location = {
      locationName,
      address,
      phone,
    };
    let token = getCookie("token_user");
    createLocation(location, token)
      .then((data) => {
        if (data.status && data.status == "success") {
          console.log(data);
          setValues({
            ...values,
            locationName: "",
            address: "",
            phone: "",
          });
          setError(false);
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
      <div className="m-5">
        <h2 className="text-gray-600 text-2xl mt-2 mb-2 font-semibold ">
          Create Location
        </h2>
        <form>
          <div className="grid grid-cols-3 mt-1 mb-1">
            <label className="col-span-1 p-2 rounded-lg mr-2 bg-gray-200 font-bold text-xl text-gray-600">
              Location Name
            </label>
            <input
              className="col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg outline-none text-gray-600"
              type="text"
              value={locationName}
              onChange={handleChange("locationName")}
              placeholder="Enter Location Name"
            />
            {error && !locationName && (
              <div className="flex justify-center col-span-3 border-red-500 border-2 rounded-lg mt-1 mb-1">
                <h2 className="text-red-500 ">Please enter a Location Name</h2>
              </div>
            )}
          </div>
          <div className="grid grid-cols-3 mt-1 mb-1">
            <label className="col-span-1 p-2 rounded-lg mr-2 bg-gray-200 font-bold text-xl text-gray-600">
              Address
            </label>
            <input
              className="col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg outline-none text-gray-600"
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={handleChange("address")}
            />
            {error && !address && (
              <div className="flex justify-center col-span-3 border-red-500 border-2 rounded-lg mt-1 mb-1">
                <h2 className="text-red-500 ">Please add a Address</h2>
              </div>
            )}
          </div>
          <div className="grid grid-cols-3 mt-1 mb-1">
            <label className="col-span-1 p-2 rounded-lg mr-2 bg-gray-200 font-bold text-xl text-gray-600">
              Phone
            </label>
            <input
              className="col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg outline-none text-gray-600"
              type="text"
              placeholder="Enter Phone"
              value={phone}
              onChange={handleChange("phone")}
            />
            {error && phone?.length <= 9 && (
              <div className="flex justify-center col-span-3 border-red-500 border-2 rounded-lg mt-1 mb-1">
                <h2 className="text-red-500 ">
                  Please add a Valid Phone number
                </h2>
              </div>
            )}
          </div>
          <div className="flex justify-center mt-3">
            <button
              className="p-3 font-bold text-xl text-white bg-blue-300 rounded-lg hover:bg-blue-500"
              onClick={handleSubmit}
            >
              Create Location
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateLocation;
