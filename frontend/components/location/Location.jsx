import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import { deletePatient } from "actions/patient";
import { getCookie } from "actions/auth";
import { deleteLocation } from "actions/location";
// import { deletelocation } from "actions/location";
// import Message from "components/Message";

const Location = ({ location }) => {
  console.log(location.role);
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
        await deleteLocation(id, token)
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
      <div className="grid grid-cols-5 gap-2 md:grid-cols-6 p-4 border-b-2 border-gray-200 hover:bg-gray-300 transition-all rounded-xl">
        <h3 className="hidden md:block col-span-1">
          {location._id.substr(location._id.length / 2, location._id.length)}
        </h3>
        {/* <h3 className="md:hidden">
          {location._id.substr(location._id.length - 5, location._id.length)}
        </h3> */}

        <Link
          href={`/locations/single/${location._id}`}
          // className="col-span-3 md:col-span-3"
          className="underline text-2sm font-bold capitalize text-gray-800"
        >
          {/* <Link href={`/user/one/${location._id}`} className="col-span-2"> */}
          {location.locationName}
        </Link>

        {/* <h3 className="hidden md:blcok">
          {location.hospitals.length > 0 && location.hospitals[0].name}
        </h3> */}
        {/* <h3 className="hidden md:block">{location.email}</h3>*/}
        <h3 className="">{location.address}</h3>
        <h3 className="">{location.phone}</h3>

        <Link href={`/locations/update/${location._id}`}>
          {/* <Link href={`/user/one/${location._id}`} className="col-span-2"> */}
          <h2 className="p-1 bg-green-400 text-white hover:bg-green-600 transition-all rounded-xl text-center cursor-pointer">
            Update
          </h2>
        </Link>
        <h2
          className="p-1 bg-red-400 text-white px-5 hover:bg-red-600 transition-all rounded-xl text-center cursor-pointer h-8"
          // className="p-1 bg-red-400 text-white hover:bg-red-600
          // transition-all rounded-xl text-center cursor-pointer"
          onClick={() => handleDelete(location._id)}
        >
          {" "}
          Delete
        </h2>

        {/* <Link href={`/updateRole/user/${location._id}`} className="">
        
          update
        </Link>
        <h3
          value={"Cancel"}
          onClick={() => handleDelete(location._id)}
    
          className="cursor-pointer"
        >
          Delete
        </h3> */}
      </div>
    </>
  );
};

export default Location;
