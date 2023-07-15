import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import { deletePatient } from "actions/patient";
import { getCookie } from "actions/auth";
import { deleteDevice, updateDevice } from "actions/device";
// import { deletelocation } from "actions/location";

const Device = ({ device }) => {
  console.log(device.length, "from device.......................");
  const router = useRouter();
  const handleDelete = async (id) => {
    // e.preventDefault();
    // console.log("clickkedd....", id);
    // e.preventDefault();
    let token;

    if (getCookie("token_user")) {
      //   console.log(JSON.parse(localStorage.getItem("user"))._id, id);
      //   if (JSON.parse(localStorage.getItem("user"))._id == id) {
      token = getCookie("token_user");
      let clicked = confirm(`You are about to delete ${id} `);

      if (clicked) {
        await deleteDevice(id, token)
          .then((data) => {
            console.log(data);
            router.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }

      //   }
    } else {
      alert("You dont't have the permission to perform this action...");
      return;
    }
  };
  const handleRemove = async (id) => {
    // e.preventDefault();
    // console.log("clickkedd....", id);
    // e.preventDefault();
    let token;

    if (getCookie("token_user")) {
      //   console.log(JSON.parse(localStorage.getItem("user"))._id, id);
      //   if (JSON.parse(localStorage.getItem("user"))._id == id) {
      token = getCookie("token_user");
      let clicked = confirm(`You are about to remove ${id} from this location`);
      let data = {
        location: "0123456789ab",
      };

      let formData = new FormData();

      for (const key in data) {
        formData.append(key, data[key]);

        // console.log(`${key}: ${phone[key]}`);
      }

      if (clicked) {
        await updateDevice(id, formData, token)
          .then((data) => {
            console.log(data);
            router.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }

      //   }
    } else {
      alert("You dont't have the permission to perform this action...");
      return;
    }
  };
  return (
    <>
      {device.length == 0 ? (
        <h2>This location have no devices</h2>
      ) : (
        <div className="grid grid-cols-5 gap-2 md:grid-cols-7 p-4 border-b-2 border-gray-200 hover:bg-gray-300 transition-all rounded-xl align-middle">
          {/* <h3 className="hidden md:block col-span-1">
            {device._id.substr(device._id.length / 2, device._id.length)}
          </h3> */}
          <div className="h-400">
            {device.images ? (
              <img
                src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/devices/image/${device.images[0]}`}
                className="mx-auto w-full h-15 rounded-xl"
                // className="md:rounded-full mx-auto"
              />
            ) : (
              <img
                src="/images/locationMain.png"
                className="mx-auto w-2/3 h-80"
              />
            )}
          </div>
          {/* <h3 className="md:hidden">
          {device._id.substr(device._id.length - 5, device._id.length)}
        </h3> */}

          <Link
            href={`/devices/single/${device._id}`}
            // className="col-span-3 md:col-span-3"
            className="underline text-2sm font-bold capitalize"
          >
            {/* <Link href={`/user/one/${device._id}`} className="col-span-2"> */}
            {device.serialNumber}
          </Link>

          {/* <h3 className="hidden md:blcok">
          {device.hospitals.length > 0 && device.hospitals[0].name}
        </h3> */}
          {/* <h3 className="hidden md:block">{device.email}</h3>*/}
          <h3 className="">{device.status}</h3>
          <h3 className="">{device.type}</h3>

          {/* <Link href={`/devices/update/${device._id}`}> */}
          {/* <Link href={`/user/one/${device._id}`} className="col-span-2"> */}
          <h2
            className="p-1 bg-green-400 text-white hover:bg-green-600 transition-all rounded-xl text-center cursor-pointer h-8"
            onClick={() => handleRemove(device._id)}
          >
            remove
          </h2>
          {/* </Link> */}

          <Link href={`/devices/update/${device._id}`}>
            {/* <Link href={`/user/one/${device._id}`} className="col-span-2"> */}
            <h2 className="p-1 bg-green-400 text-white hover:bg-green-600 transition-all rounded-xl text-center cursor-pointer">
              Update
            </h2>
          </Link>
          <h2
            className="p-1 bg-red-400 text-white px-5 hover:bg-red-600 transition-all rounded-xl text-center cursor-pointer h-8"
            // className="p-1 bg-red-400 text-white hover:bg-red-600
            // transition-all rounded-xl text-center cursor-pointer"
            onClick={() => handleDelete(device._id)}
          >
            {" "}
            Delete
          </h2>

          {/* <Link href={`/updateRole/user/${device._id}`} className="">
        
          update
        </Link>
        <h3
          value={"Cancel"}
          onClick={() => handleDelete(device._id)}
    
          className="cursor-pointer"
        >
          Delete
        </h3> */}
        </div>
      )}
    </>
  );
};

export default Device;
