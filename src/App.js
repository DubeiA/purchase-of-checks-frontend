import { ListProducts } from "./ListProducts/ListProducts.jsx";
import { ListReceipt } from "./ListReceipt/ListReceipt.jsx";
import css from "./ListProducts/ListProducts.module.css";
import { useState } from "react";

export const App = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSelectProduct = (product) => {
    if (selectedProducts.includes(product)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== product));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  return (
    <div className={css.container}>
      <ListProducts onSelectProduct={handleSelectProduct} />
      <ListReceipt selectedProducts={selectedProducts} />
    </div>
  );
};
