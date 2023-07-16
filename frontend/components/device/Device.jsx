import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCookie } from "actions/auth";
import { deleteDevice, updateDevice } from "actions/device";

const Device = ({ device, all }) => {
  const router = useRouter();
  const handleDelete = async (id) => {
    let token;

    if (getCookie("token_user")) {
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
    let token;

    if (getCookie("token_user")) {
      token = getCookie("token_user");
      let clicked = confirm(`You are about to remove ${id} from this location`);
      let data = {
        location: "0123456789ab",
      };

      let formData = new FormData();

      for (const key in data) {
        formData.append(key, data[key]);
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
        <div
          className={
            all
              ? `grid grid-cols-5 gap-2 md:grid-cols-6 p-4 border-b-2 border-gray-200 hover:bg-gray-300 transition-all rounded-xl align-middle`
              : `grid grid-cols-5 gap-2 md:grid-cols-7 p-4 border-b-2 border-gray-200 hover:bg-gray-300 transition-all rounded-xl align-middle`
          }
        >
          <div className="h-400">
            {device.images ? (
              <img
                src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/devices/image/${device.images[0]}`}
                className="mx-auto w-full h-15 rounded-xl"
              />
            ) : (
              <img
                src="/images/locationMain.png"
                className="mx-auto w-2/3 h-80"
              />
            )}
          </div>

          <Link
            href={`/devices/single/${device._id}`}
            className="underline text-2sm font-bold capitalize text-gray-700"
          >
            {device.serialNumber}
          </Link>

          <h3 className="">{device.status}</h3>
          <h3 className="">{device.type}</h3>

          {all == false && (
            <h2
              className="p-1 bg-green-400 text-white hover:bg-green-600 transition-all rounded-xl text-center cursor-pointer h-8"
              onClick={() => handleRemove(device._id)}
            >
              remove
            </h2>
          )}

          <Link href={`/devices/update/${device._id}`}>
            <h2 className="p-1 bg-green-400 text-white hover:bg-green-600 transition-all rounded-xl text-center cursor-pointer">
              Update
            </h2>
          </Link>
          <h2
            className="p-1 bg-red-400 text-white px-5 hover:bg-red-600 transition-all rounded-xl text-center cursor-pointer h-8"
            onClick={() => handleDelete(device._id)}
          >
            {" "}
            Delete
          </h2>
        </div>
      )}
    </>
  );
};

export default Device;
