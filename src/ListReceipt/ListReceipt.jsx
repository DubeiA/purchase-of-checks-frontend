export const ListReceipt = ({ selectedProducts }) => {
  return (
    <div>
      <div>
        <ul>
          <li>#</li>
          <li>Найменування</li>
          <li>Кількість</li>
          <li>Вартість</li>
        </ul>
      </div>
      <div>
        <ul>
          {selectedProducts.map((product, index) => (
            <li key={index}>
              <p>{product.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
