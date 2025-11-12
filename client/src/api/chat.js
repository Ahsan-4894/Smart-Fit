import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_SERVER_URL + "/api/v1/chat";
export const chat = async (payload) => {
  const { data } = await axios.post(BASE_URL + "/", payload, {
    withCredentials: true,
  });
  return data;
};
