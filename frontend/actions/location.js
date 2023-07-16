import fetch from "isomorphic-fetch";
import axios from "axios";

let API = process.env.NEXT_PUBLIC_API_DEVELOPMENT;

if (process.env.NEXT_PUBLIC_PRODUCTION == true) {
  API = process.env.NEXT_PUBLIC_API_PRODUCTION;
}

export const createLocation = async (data, token) => {
  console.log(token);
  let url = `${API}/locations/`;
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: data,
    body: JSON.stringify(data),
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

export const allLocations = (paramsData) => {
  let url = `${API}/locations`;

  return axios(url, {
    method: "GET",

    params: {
      page: paramsData.page,
      limit: paramsData.limit,
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
export const oneLocation = (id) => {
  let url = `${API}/locations/${id}`;

  return axios(url, {
    method: "GET",
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

export const updateLocation = async (id, data, token) => {
  console.log(id, data, token);
  let url = `${API}/locations/${id}`;
  return fetch(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: data,
    body: JSON.stringify(data),
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

export const deleteLocation = async (id, token) => {
  // console.log(data, token);
  let url = `${API}/locations/${id}`;
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

export const locationNameId = () => {
  let url = `${API}/locations/locationNameId`;

  return axios(url, {
    method: "GET",
    // params: { ...query },
    // params: {
    //   page: paramsData.page,
    //   limit: paramsData.limit,
    //   //   name: paramsData.name,
    //   //   city: paramsData.city,
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
