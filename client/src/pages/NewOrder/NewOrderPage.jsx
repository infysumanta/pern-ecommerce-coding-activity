import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const NewOrderPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState();
  const [description, setDescription] = useState("");
  const [selectProducts, setSelectProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const checkedProductHandler = (product, e) => {
    if (e.target.checked) {
      setSelectProducts((prevState) => [...prevState, product]);
    } else {
      setSelectProducts((prevState) =>
        prevState.filter((item) => item.id !== product.id)
      );
    }
  };

  const formSubmitHandler = async () => {
    try {
      const body = {
        orderDescription: description,
        products: JSON.stringify(selectProducts),
      };
      const { data } = await axios.post("/api/orders", body);
      if (data.success) {
        toast.success(data?.message);
        navigate("/");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  const backToOrder = () => {
    navigate("/");
  };
  return (
    <div className="w-1/3 m-auto mt-20">
      <div className="bg-white rounded-md shadow-md p-4">
        <div className="flex justify-between items-center">
          <div className="font-bold text-2xl">New Order</div>
        </div>
        <div className="card-body  mt-5">
          <div className="form-container">
            <div className="m-3">
              <input
                type="text"
                className="order_descriptions"
                placeholder="Order Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="product-list">
              {products &&
                products.map((product, index) => (
                  <div key={product.id} className="flex items-start gap-2 m-3">
                    <input
                      type="checkbox"
                      value={product.id}
                      name="product"
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
                      {product.productname}
                      <br />
                      {product.productdescription}
                    </label>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between m-3">
          <button className="cancel_btn" onClick={backToOrder}>
            Cancel
          </button>
          <button className="submit_btn" onClick={formSubmitHandler}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewOrderPage;
