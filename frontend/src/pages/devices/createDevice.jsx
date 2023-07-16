import React, { useState, useEffect } from "react";
import Layout from "components/Layout";

import { getCookie } from "actions/auth";
import { createDevice } from "actions/device";
import { locationNameId } from "actions/location";
import Message from "components/Message";

const CreateDevice = () => {
  const [locationNames, setLocationNames] = useState();
  const [error, setError] = useState(false);
  // const [validationError, setValidationError] = useState();
  // let validationError = "";
  const [values, setValues] = useState({
    serialNumber: "",
    type: "",
    status: "",
    location: "",
    images: "",
    formData: "",
  });

  // const [formValidation, setFormValidation] = useState({
  //   serialNumberForm: false,
  //   typeForm: false,
  //   statusForm: false,
  //   locationForm: false,
  //   imagesFomr: false,
  //   serialNumberMsg: "",
  //   typeMsg: "",
  //   statusMsg: "",
  //   locationMsg: "",
  //   imagesMsg: "",
  // });
  // useEffect(() => {
  //   validateForm();
  // }, [
  //   formValidation.serialNumberForm,
  //   formValidation.typeForm,
  //   formValidation.statusForm,
  //   formValidation.locationForm,
  //   formValidation.imagesFomr,
  // ]);

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
  // const validateForm = () => {
  //   if (!values.serialNumber) {
  //     setFormValidation({
  //       ...formValidation,
  //       serialNumberForm: true,
  //       serialNumberMsg: "Please enter a serial number",
  //     });
  //     validationError = formValidation.serialNumberMsg;
  //     // setValidationError(formValidation.serialNumberMsg);
  //     return true;
  //   } else {
  //     setFormValidation({
  //       // ...formValidation,
  //       serialNumberForm: !formValidation.serialNumberForm,
  //       serialNumberMsg: "",
  //     });
  //     console.log(formValidation.serialNumberForm);
  //   }
  //   if (!values.type || values.type.length <= 0) {
  //     setFormValidation({
  //       ...formValidation,
  //       typeForm: true,
  //       typeMsg: "Please enter a Type",
  //     });
  //     validationError = formValidation.typeMsg;
  //     // setValidationError(formValidation.typeMsg);
  //     return true;
  //   } else {
  //     setFormValidation({
  //       ...formValidation,
  //       typeForm: false,
  //       typeMsg: "",
  //     });
  //   }
  //   if (!values.status || values.status.length <= 0) {
  //     setFormValidation({
  //       ...formValidation,
  //       statusForm: true,
  //       statusMsg: "Please enter a status",
  //     });
  //     validationError = formValidation.statusMsg;
  //     // setValidationError(formValidation.statusMsg);
  //     return true;
  //   } else {
  //     setFormValidation({
  //       ...formValidation,
  //       statusForm: false,
  //       statusMsg: "",
  //     });
  //   }
  //   if (!values.status || values.status.length <= 0) {
  //     setFormValidation({
  //       ...formValidation,
  //       statusForm: true,
  //       statusMsg: "Please enter a status",
  //     });
  //     validationError = formValidation.statusMsg;
  //     // setValidationError(formValidation.statusMsg);
  //     return true;
  //   } else {
  //     setFormValidation({
  //       ...formValidation,
  //       statusForm: false,
  //       statusMsg: "",
  //     });
  //   }
  //   if (!values.location || values.location.length <= 0) {
  //     setFormValidation({
  //       ...formValidation,
  //       locationForm: true,
  //       locationMsg: "Please enter a location",
  //     });
  //     validationError = formValidation.locationMsg;
  //     // setValidationError(formValidation.locationMsg);
  //     return true;
  //   } else {
  //     setFormValidation({
  //       ...formValidation,
  //       locationForm: false,
  //       locationMsg: "",
  //     });
  //   }
  //   if (!values.images || values.images.length <= 0) {
  //     setFormValidation({
  //       ...formValidation,
  //       imagesForm: true,
  //       imagesMsg: "Please select a Image",
  //     });
  //     validationError = formValidation.imagesMsg;
  //     // setValidationError(formValidation.imagesMsg);
  //     return true;
  //   } else {
  //     setFormValidation({
  //       ...formValidation,
  //       imagesForm: false,
  //       imagesMsg: "",
  //     });
  //   }
  //   validationError = "";
  //   // setValidationError("");
  //   return false;
  // };

  const handleSubmit = (e) => {
    // handleSubmit = (e) => {
    e.preventDefault();
    // if (validateForm()) {
    //   return;
    // }
    // validateForm();

    // -----------------------------------
    if (!values.serialNumber || values.serialNumber.length <= 0) {
      setError(true);
      return;
    }
    if (!values.type || values.type.length <= 0) {
      setError(true);
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
    // validateForm();
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
        {/* {validationError && (
          <div className="w-full h-10 flex justify-center bg-red-500 border-red-600 border-4 rounded-lg">
            <h2 className="text-xl font-bold text-white">{validationError}</h2>
          </div>
        )} */}
        <form>
          <div className="grid grid-cols-3 mt-1 mb-1">
            <label className="col-span-1 p-2 rounded-lg mr-2 bg-gray-200  font-bold text-xl">
              Serial Number
            </label>
            {/* {console.log(formValidation)} */}
            <input
              className={
                // formValidation.serialNumberForm
                //   ? "col-span-2 p-2 rounded-lg ml-2 bg-red-200 font-bold text-lg border-red-500 border-4"
                // :
                "col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg"
              }
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
            <label className="col-span-1 p-2 rounded-lg mr-2 bg-gray-200 font-bold text-xl">
              type
            </label>
            <select
              type="text"
              value={type}
              onChange={handleChange("type")}
              //   class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              // className="col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg"
              className={
                //   formValidation.typeForm
                // ? "col-span-2 p-2 rounded-lg ml-2 bg-red-200 font-bold text-lg border-red-500 border-4"
                // :
                "col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg"
              }
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
              // className="col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg"

              className={
                // formValidation.statusForm
                //   ? "col-span-2 p-2 rounded-lg ml-2 bg-red-200 font-bold text-lg border-red-500 border-4"
                // :
                "col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg"
              }
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
              // className="col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg"
              className={
                // formValidation.locationForm
                //   ? "col-span-2 p-2 rounded-lg ml-2 bg-red-200 font-bold text-lg border-red-500 border-4"
                // :
                "col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg"
              }
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
              // className="col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg"
              className={
                // formValidation.imagesFomr
                //   ? "col-span-2 p-2 rounded-lg ml-2 bg-red-200 font-bold text-lg border-red-500 border-4"
                // :
                "col-span-2 p-2 rounded-lg ml-2 bg-gray-200 font-bold text-lg"
              }
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
