import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_SERVER_URL + "/api/v1/admin";

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

export const logout = async () => {
  try {
    const { data } = await axios.post(
      BASE_URL + "/logout",
      {},
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    throw err;
  }
};

export const dashboard = async () => {
  const { data } = await axios.get(BASE_URL + "/dashboard", {
    withCredentials: true,
  });
  return data;
};
