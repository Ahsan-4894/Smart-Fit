import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_SERVER_URL + "/api/v1/plan";

export const getAllPlans = async () => {
  try {
    const { data } = await axios.get(BASE_URL + "/getPlans", {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const addPlan = async (formData) => {
  const { data } = await axios.post(BASE_URL + "/addplan", formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updatePlan = async (formData) => {
  try {
    const { data } = await axios.put(BASE_URL + "/editplan", formData, {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    throw err;
  }
};
