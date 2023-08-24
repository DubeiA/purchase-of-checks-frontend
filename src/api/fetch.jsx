import axios from "axios";

axios.defaults.baseURL = "https://receipt-system.onrender.com";

export const getProducts = async () => {
  try {
    const products = await axios.get("/");

    return products.data;
  } catch (error) {
    console.log(error);
  }
};
