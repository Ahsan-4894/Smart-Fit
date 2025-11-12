import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_SERVER_URL + "/api/v1/users";
import toast from "react-hot-toast";

export const login = async (payload) => {
  try {
    const { data } = await axios.post(BASE_URL + "/login", payload, {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const register = async (payload) => {
  try {
    const { data } = await axios.post(BASE_URL + "/register", payload, {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const logout = async () => {
  const { data } = await axios.post(
    BASE_URL + "/logout",
    {},
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const dashboard = async () => {
  const { data } = await axios.get(BASE_URL + "/dashboard", {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};
