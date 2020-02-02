import axios from "axios";
import { httpConstants } from "../constants/httpConstants";
import { getJwt } from "../lib/auth";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});

axiosInstance.interceptors.request.use(
  config => {
    let token = getJwt();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    return Promise.reject(error.response);
  }
);

export const apiRequest = ({ url, body, method }) => {
  return axiosInstance({ method, url, data: JSON.stringify(body) })
    .then(response => {
      if (response.status > httpConstants.NO_CONTENT_SUCCESS) {
        return Promise.reject(response);
      }
      return response.data;
    })
    .then(result => result);
};
