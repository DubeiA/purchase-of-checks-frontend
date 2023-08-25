import { useCallback, useEffect, useState } from "react";

import {
  AddReceipt,
  closeReceipt,
  deleteReceipt,
  updateReceipt,
} from "../api/ApiProducts";
import css from "./ListReceipt.module.css";

export const ListReceipt = ({ selectedProducts, filterProducts }) => {
  const [receiptId, setReceiptId] = useState(null);
  const [quantities, setQuantities] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (selectedProducts) {
      setQuantities(selectedProducts.map(() => 1));
    }
  }, [selectedProducts]);

  const removeProduct = async (receiptId, product) => {
    try {
      await deleteReceipt(receiptId.id, product.id);
      filterProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== product.id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const decrement = (index) => {
    setQuantities((prevState) =>
      prevState.map((quantity, i) => {
        if (i === index) {
          const newQuantity = Math.max(quantity - 1, 0);
          if (newQuantity === 0) {
            removeProduct(receiptId, selectedProducts[index]);
          }
          return newQuantity;
        }
        return quantity;
      })
    );
  };

  const increment = (index) => {
    setQuantities((prevState) =>
      prevState.map((quantity, i) => (i === index ? quantity + 1 : quantity))
    );
  };

  const getTotalPrice = () => {
    let total = 0;
    selectedProducts.forEach((product, index) => {
      total += product.price * quantities[index];
    });
    return total.toFixed(2);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCreateReceipt = useCallback(async () => {
    const total = getTotalPrice();
    try {
      const receiptId = await AddReceipt(total);
      setReceiptId(receiptId);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (isOpen && selectedProducts && quantities.length >= 1) {
      handleCreateReceipt();
      console.log(receiptId);
      setIsOpen(false);
    }
  }, [
    handleCreateReceipt,
    isOpen,
    quantities.length,
    receiptId,
    selectedProducts,
  ]);

  useEffect(() => {
    if (receiptId && selectedProducts && quantities.length >= 1) {
      const productsToUpdate = selectedProducts.map((product, index) => ({
        id: product.id,
        quantity: quantities[index] || 1,
        price: product.price,
      }));

      updateReceipt(receiptId.id, productsToUpdate);
    }
  }, [quantities, receiptId, selectedProducts]);

  const close = async (receiptId) => {
    console.log(receiptId);
    await closeReceipt(receiptId, getTotalPrice());
    setQuantities([]);
    setIsOpen(true);
    filterProducts([]);
  };

  return (
    <div className={css.container}>
      <div>
        <ul className={css.list}>
          <li>#</li>
          <li>Найменування</li>
          <li>Кількість</li>
          <li>Вартість</li>
        </ul>
      </div>
      <div>
        <ol className={css.list_product}>
          {selectedProducts.map((product, index) => (
            <li className={css.item_product} key={product.id}>
              <p>{index + 1}</p>
              <p>{product.name}</p>
              <div className={css.box_btn}>
                <button onClick={() => decrement(index)}>-</button>
                <p>{quantities[index]}</p>
                <button onClick={() => increment(index)}>+</button>
              </div>
              <div className={css.price_box}>
                <p className={css.quantity}>
                  {quantities[index]} * {product.price}
                </p>
                <p className={css.calc}>
                  {(product.price * quantities[index]).toFixed(2)}
                </p>
              </div>
              <button
                className={css.delete_btn}
                onClick={() => removeProduct(receiptId, product)}
              >
                X
              </button>
            </li>
          ))}
        </ol>
        <div className={css.pay}>
          <p
            className={css.create_receipt_btn}
            //   onClick={() => setIsOpen(true)}
          >
            До сплати: {getTotalPrice()}$
          </p>
          <div className={css.box_btn}>
            <button className={css.btn} onClick={() => close(receiptId.id)}>
              Карткою
            </button>
            <button className={css.btn} onClick={() => close(receiptId.id)}>
              готікою{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
