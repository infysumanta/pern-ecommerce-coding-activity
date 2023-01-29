import React from "react";

const ProductItem = ({ product, checkedProductHandler }) => {
  return (
    <div key={product.id} className="flex items-start gap-2 m-3">
      <input
        type="checkbox"
        value={product.id}
        name="product"
        checked={product.checked}
        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-100 rounded cursor-pointer mt-1"
        id={`product_${product.id}`}
        onChange={(e) => {
          checkedProductHandler(product, e);
        }}
      />
      <label
        className="border w-full p-1 border-gray-400 cursor-pointer  rounded-md\\"
        htmlFor={`product_${product.id}`}
      >
        {product.name}
        <br />
        {product.description}
      </label>
    </div>
  );
};

export default ProductItem;
