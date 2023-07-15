import React, { useState, useEffect } from "react";
import Layout from "components/Layout";

import { getCookie } from "actions/auth";
import { createDevice } from "actions/device";
import { locationNameId } from "actions/location";
import Message from "components/Message";

const CreateDevice = () => {
  const [locationNames, setLocationNames] = useState();
  const [values, setValues] = useState({
    serialNumber: "",
    type: "",
    status: "",
    location: "",
    images: "",
    formData: "",
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

  useEffect(() => {
    setValues({ formData: new FormData() });
    getNames();
  }, []);

  // useEffect(() => {
  //   if (getCookie("token_user")) {
  //     Router.push(`/`);
  //   }
  // }, []);

  const getNames = async () => {
    await locationNameId()
      .then((data) => {
        if (data.status && data.status == "success") {
          console.log(data);

          setLocationNames(data);

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

  const { serialNumber, type, status, images, location, formData } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert({ ...alert, loading: true });
    setValues({ ...values, loading: true, error: false });
    // console.log(values);
    const data = {
      serialNumber,
      type,
      status,
      location,
      //   images,
    };

    for (const key in data) {
      formData.append(key, data[key]);
      setValues({ ...values, formData });
      // console.log(`${key}: ${phone[key]}`);
    }

    let token = getCookie("token_user");
    createDevice(values.formData, token)
      .then((data) => {
        if (data.status && data.status == "success") {
          console.log(data);
          setValues({
            ...values,
            serialNumber: "",
            type: "",
            status: "",
            images: "",
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

  //   const handleChange = (name) => (e) => {
  //     setValues({ ...values, error: false, [name]: e.target.value });
  //   };
  const handleChange = (name) => (e) => {
    e.preventDefault();
    let value = name == "images" ? e.target.files[0] : e.target.value;
    if (name == "images") {
      console.log(name, value, "workin..");
      formData.append(name, value);
      setValues({ ...values, [name]: value, formData });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  return (
    <Layout>
      <div className="m-5">
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
        <h2 className="text-gray-400 text-2xl mt-2 mb-2 font-semibold ">
          Create Device
        </h2>
        <form>
          <div className="grid grid-cols-3 mt-1 mb-1">
            <label className="col-span-1 p-2 rounded-lg mr-2 bg-gray-200 font-bold text-xl">
              Serial Number
            </label>
            <input
              className="col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg"
              type="text"
              value={serialNumber}
              onChange={handleChange("serialNumber")}
              placeholder="Enter Serial Number"
            />
          </div>
          <div className="grid grid-cols-3 mt-1 mb-1">
            <label className="col-span-1 p-2 rounded-lg mr-2 bg-gray-200 font-bold text-xl">
              type
            </label>
            <select
              type="text"
              value={type}
              onChange={handleChange("type")}
              //   class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              className="col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg"
              placeholder="Select Type"
            >
              <option value={"none"}>Select Type</option>
              <option value={"pos"}>Pos</option>
              <option value={"kisok"}>Kisok</option>
              <option value={"signage"}>Signage</option>
            </select>
            {/* <input
              className="col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg"
              type="text"
              placeholder="Enter type"
              value={type}
              onChange={handleChange("type")}
            /> */}
          </div>
          <div className="grid grid-cols-3 mt-1 mb-1">
            <label className="col-span-1 p-2 rounded-lg mr-2 bg-gray-200 font-bold text-xl">
              status
            </label>
            <select
              type="text"
              value={type}
              onChange={handleChange("status")}
              //   class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              className="col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg"
              placeholder="Select Status"
            >
              <option value={"none"}>Select Status</option>
              <option value={"active"}>Active</option>
              <option value={"inactive"}>Inactive</option>
            </select>
            {/* <input
              className="col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg"
              type="text"
              placeholder="Enter status"
              value={status}
              onChange={handleChange("status")}
            /> */}
          </div>
          <div className="grid grid-cols-3 mt-1 mb-1">
            <label className="col-span-1 p-2 rounded-lg mr-2 bg-gray-200 font-bold text-xl">
              Location
            </label>
            <select
              type="text"
              value={type}
              onChange={handleChange("location")}
              //   class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              className="col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg"
              placeholder="Select a Location"
            >
              <option>Select A Location</option>
              {locationNames &&
                locationNames.doc.map((location, index) => {
                  return (
                    <option
                      className="text-gray-600 text-xl"
                      value={location._id}
                      key={index}
                    >
                      {`${location.locationName}-${location._id}`}
                    </option>
                  );
                })}
            </select>
            {/* <input
              className="col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg"
              type="text"
              placeholder="Select Location"
              value={location}
              onChange={handleChange("location")}
            /> */}
          </div>
          <div className="grid grid-cols-3 mt-1 mb-1">
            <label className="col-span-1 p-2 rounded-lg mr-2 bg-gray-200 font-bold text-xl">
              Image
            </label>
            <input
              className="col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg"
              type="file"
              placeholder="SelectImage"
              //   value={images}
              onChange={handleChange("images")}
            />
          </div>
          <div className="flex justify-center mt-3">
            <button
              className="p-3 font-bold text-xl bg-blue-300 rounded-lg hover:bg-blue-500"
              onClick={handleSubmit}
            >
              Create Device
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateDevice;
