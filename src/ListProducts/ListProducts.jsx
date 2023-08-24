import { useEffect } from "react";
import { useState } from "react";
import { getProducts } from "../api/fetch";

import css from "./ListProducts.module.css";

export const ListProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(products);
  return (
    // <div className={css.box}>
    <ul className={css.list}>
      {products.map((product) => {
        return (
          <li key={product.id}>
            <p>{product.name}</p>
            <p>{product.price}$</p>
          </li>
        );
      })}
    </ul>
    // </div>
  );
};
