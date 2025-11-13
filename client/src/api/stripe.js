import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_SERVER_URL + "/api/v1/stripe";

export const createCheckoutSession = async (planId, userDetails) => {
  try {
    const { data } = await axios.post(
      BASE_URL + "/create-checkout-session",
      { planId, userDetails },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    throw err;
  }
};

export const verifyPayment = async (sessionId) => {
  try {
    const { data } = await axios.get(
      BASE_URL + "/verify-payment?sessionId=" + sessionId,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    throw err;
  }
};
