import { useEffect, useState } from "react";
import { getProducts } from "../api/ApiProducts";

import css from "./ListProducts.module.css";

export const ListProducts = ({ onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");

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

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleProductClick = (product) => {
    onSelectProduct(product);
  };

  return !products.length >= 1 ? (
    <p>Wait for Loading... </p>
  ) : (
    <div className={css.box}>
      <form>
        <input
          className={css.search_bar}
          type="text"
          value={searchText}
          onChange={handleSearchInputChange}
          placeholder="Search products"
        />
      </form>

      <div className={css.columns_section}>
        <ul className={css.list}>
          {filteredProducts.map((product) => {
            return (
              <li
                className={css.item}
                key={product.id}
                onClick={() => handleProductClick(product)}
              >
                <p className={css.text}>{product.name}</p>
                <p className={css.text}>{product.price}$</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
