import React, { useState, useEffect } from "react";
import Layout from "components/Layout";
import { getCookie } from "actions/auth";
import { updateDevice, oneDevice } from "actions/device";
import { locationNameId } from "actions/location";
import Message from "components/Message";
import { useRouter } from "next/router";

const UpdateDevice = () => {
  const router = useRouter();
  const [locationNames, setLocationNames] = useState();
  const [values, setValues] = useState({
    serialNumber: "",
    type: "",
    status: "",
    location: "",
    images: "",
    formData: "",
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

  useEffect(() => {
    setValues({ formData: new FormData() });
    getNames();
    getDevice();
  }, [router]);

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

  const getDevice = async () => {
    let deviceId = router.query.deviceId;
    console.log(deviceId);
    await oneDevice(deviceId)
      .then((data) => {
        if (data.status && data.status == "success") {
          console.log(data);

          setValues({
            ...values,
            serialNumber: data.device.serialNumber,
            type: data.device.type,
            status: data.device.status,
            location: data.device.location,
            formData: new FormData(),
            // images: data.device.images,
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

  const { serialNumber, type, status, images, location, formData } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    // -----------------------------------
    if (!values.serialNumber || values.serialNumber.length <= 0) {
      setError(true);
      return;
    }
    if (!values.type || values.type.length <= 0) {
      setError(true);
      return;
    }
    if (!values.status || values.status.length <= 0) {
      setError(true);
      return;
    }
    if (!values.location || values.location.length <= 0) {
      setError(true);
      return;
    }
    if (!values.images || values.images.length <= 0) {
      setError(true);
      return;
    }
    // -----------------------------------

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
    let id = router.query.deviceId;

    let token = getCookie("token_user");
    updateDevice(id, values.formData, token)
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
        <h2 className="text-gray-600 text-2xl mt-2 mb-2 font-semibold ">
          Update Device
        </h2>
        <form>
          <div className="grid grid-cols-3 mt-1 mb-1">
            <label className="col-span-1 p-2 rounded-lg mr-2 bg-gray-200 font-bold text-xl text-gray-600">
              Serial Number
            </label>
            <input
              className="col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg outline-none text-gray-600"
              type="text"
              value={serialNumber}
              onChange={handleChange("serialNumber")}
              placeholder="Enter Serial Number"
            />
            {error && !serialNumber && (
              <div className="flex justify-center col-span-3 border-red-500 border-2 rounded-lg mt-1 mb-1">
                <h2 className="text-red-500 ">Please add a serial number</h2>
              </div>
            )}
          </div>
          <div className="grid grid-cols-3 mt-1 mb-1">
            <label className="col-span-1 p-2 rounded-lg mr-2 bg-gray-200 font-bold text-xl text-gray-600">
              type
            </label>
            <select
              type="text"
              value={type}
              onChange={handleChange("type")}
              className="col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg outline-none text-gray-600"
              placeholder="Select Type"
            >
              <option value={""}>Select Type</option>
              <option value={"pos"}>Pos</option>
              <option value={"kisok"}>Kisok</option>
              <option value={"signage"}>Signage</option>
            </select>
            {error && type?.length <= 0 && (
              <div className="flex justify-center col-span-3 border-red-500 border-2 rounded-lg mt-1 mb-1">
                <h2 className="text-red-500 ">Please add a Type</h2>
              </div>
            )}
          </div>
          <div className="grid grid-cols-3 mt-1 mb-1">
            <label className="col-span-1 p-2 rounded-lg mr-2 bg-gray-200 font-bold text-xl text-gray-600">
              status
            </label>
            <select
              type="text"
              value={status}
              onChange={handleChange("status")}
              className="col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg outline-none text-gray-600"
              placeholder="Select Status"
            >
              <option value={""}>Select Status</option>
              <option value={"active"}>Active</option>
              <option value={"inactive"}>Inactive</option>
            </select>
            {error && status?.length <= 0 && (
              <div className="flex justify-center col-span-3 border-red-500 border-2 rounded-lg mt-1 mb-1">
                <h2 className="text-red-500 ">Please select Status</h2>
              </div>
            )}
          </div>
          <div className="grid grid-cols-3 mt-1 mb-1">
            <label className="col-span-1 p-2 rounded-lg mr-2 bg-gray-200 font-bold text-xl text-gray-600">
              Location
            </label>
            <select
              type="text"
              value={location}
              onChange={handleChange("location")}
              className="col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg outline-none text-gray-600"
              placeholder="Select a Location"
            >
              <option value={""}>Select A Location</option>
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
            {error && location?.length <= 0 && (
              <div className="flex justify-center col-span-3 border-red-500 border-2 rounded-lg mt-1 mb-1">
                <h2 className="text-red-500 ">Please select a Location</h2>
              </div>
            )}
          </div>
          <div className="grid grid-cols-3 mt-1 mb-1">
            <label className="col-span-1 p-2 rounded-lg mr-2 bg-gray-200 font-bold text-xl text-gray-600">
              Image
            </label>
            <input
              className="col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg outline-none text-gray-600"
              type="file"
              placeholder="SelectImage"
              onChange={handleChange("images")}
            />
            {error && !images && (
              <div className="flex justify-center col-span-3 border-red-500 border-2 rounded-lg mt-1 mb-1">
                <h2 className="text-red-500 ">Please select a Image</h2>
              </div>
            )}
          </div>
          <div className="flex justify-center mt-3">
            <button
              className="p-3 font-bold text-white text-xl bg-blue-500 rounded-lg hover:bg-blue-600 transition-all"
              onClick={handleSubmit}
            >
              Update Device
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateDevice;
