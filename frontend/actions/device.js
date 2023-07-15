import fetch from "isomorphic-fetch";
import cookie from "js-cookie";
import axios from "axios";

// import Router from "next/router";

let API = process.env.NEXT_PUBLIC_API_DEVELOPMENT;

if (process.env.NEXT_PUBLIC_PRODUCTION == true) {
  API = process.env.NEXT_PUBLIC_API_PRODUCTION;
}

export const createDevice = async (data, token) => {
  console.log(token);
  let url = `${API}/devices/`;
  return fetch(url, {
    method: "POST",
    headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data,
    // body: JSON.stringify(data),
  })
    .then((response) => {
      //   console.log(response.statusText);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const allDevices = (paramsData) => {
  let url = `${API}/devices`;

  return axios(url, {
    method: "GET",
    // params: { ...query },
    params: {
      page: paramsData.page,
      limit: paramsData.limit,
      //   name: paramsData.name,
      //   city: paramsData.city,
      //   brandname: paramsData.brandname,
      //   Device: paramsData.Device,
      //   "price[gte]": paramsData.priceMin,
      //   "price[lte]": paramsData.priceMax,
      //   sort: paramsData.sort,
    },
  })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const oneDevice = (id) => {
  let url = `${API}/devices/${id}`;

  return axios(url, {
    method: "GET",
    // params: { ...query },
    // params: {
    //   page: paramsData.page,
    //   limit: paramsData.limit,
    //   name: paramsData.name,
    //   city: paramsData.city,
    //   //   brandname: paramsData.brandname,
    //   //   Device: paramsData.Device,
    //   //   "price[gte]": paramsData.priceMin,
    //   //   "price[lte]": paramsData.priceMax,
    //   //   sort: paramsData.sort,
    // },
  })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const updateDevice = async (id, data, token) => {
  console.log(id, data, token);
  let url = `${API}/devices/${id}`;
  return fetch(url, {
    method: "PATCH",
    headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data,
    // body: JSON.stringify(data),
  })
    .then((response) => {
      //   console.log(response.statusText);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const deleteDevice = async (id, token) => {
  // console.log(data, token);
  let url = `${API}/devices/${id}`;
  return fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(data),
  })
    .then((response) => {
      //   console.log(response.statusText);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
