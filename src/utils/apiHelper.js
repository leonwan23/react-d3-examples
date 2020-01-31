import axios from "axios";
import { httpConstants } from "../constants/httpConstants";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});

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
      if (response.status !== httpConstants.OK) {
        return Promise.reject(response);
      }
      return response.data;
    })
    .then(result => result);
};
