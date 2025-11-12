import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_SERVER_URL + "/api/v1/auth";

export const currentGetLoggedInUser = async () => {
  const { data } = await axios.get(BASE_URL + "/getCurrentLoggedInUser", {
    withCredentials: true,
  });
  return data;
};
