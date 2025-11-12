import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_SERVER_URL + "/api/v1/admin";

export const login = async (formData) => {
  const { data } = await axios.post(BASE_URL + "/login", formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
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

