import { useEffect } from "react";
import { useState } from "react";
import css from "./ListReceipt.module.css";

export const ListReceipt = ({ selectedProducts }) => {
  useEffect(() => {
    if (selectedProducts) {
      setQuantities(selectedProducts.map(() => 1));
    }
  }, [selectedProducts]);
  const [quantities, setQuantities] = useState([]);

  const decrement = (index) => {
    setQuantities((prevState) =>
      prevState.map((quantity, i) =>
        i === index ? Math.max(quantity - 1, 0) : quantity
      )
    );
  };

  const increment = (index) => {
    setQuantities((prevState) =>
      prevState.map((quantity, i) => (i === index ? quantity + 1 : quantity))
    );
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
              <p>{product.price}</p>
              <button className={css.delete_btn}>X</button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
