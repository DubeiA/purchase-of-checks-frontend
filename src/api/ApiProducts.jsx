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

export const AddReceipt = async (total) => {
  const calc = { total };

  try {
    const products = await axios.post("/add", calc);

    return products.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateReceipt = async (ReceiptId, productsToUpdate) => {
  const products = productsToUpdate.map((product) => ({
    ProductId: product.id,
    quantity: product.quantity,
    price: product.price,
  }));

  try {
    const response = await axios.put("/correct", {
      ReceiptId,
      products,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteReceipt = async (ReceiptId, ProductId) => {
  try {
    const products = await axios.delete("/delete", {
      data: { ReceiptId, ProductId },
    });

    return products.data;
  } catch (error) {
    console.log(error);
  }
};

export const closeReceipt = async (receiptId, total) => {
  try {
    const products = await axios.post(`/close/${receiptId}`, {
      total,
    });

    return products.data;
  } catch (error) {
    console.log(error);
  }
};
