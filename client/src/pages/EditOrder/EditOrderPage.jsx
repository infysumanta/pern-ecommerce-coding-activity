import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditOrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState();
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchOrderData = async () => {
      const { data } = await axios.get(`/api/orders/${id}`);
      setDescription(data.description);
    };
    fetchOrderData();
  }, [id, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProducts(data);
    };
    fetchProducts();
  }, [id, navigate]);

  const checkedProductHandler = (product) => {
    let productArray = products.map((prod) => {
      if (prod.id === product.id) {
        return { ...prod, checked: !prod.checked };
      }
      return prod;
    });

    setProducts(productArray);
  };

  const formSubmitHandler = async () => {
    try {
      const body = {
        orderDescription: description,
        products: JSON.stringify(products.filter((product) => product.checked)),
      };
      const { data } = await axios.put(`/api/orders/${id}`, body);
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
                value={description}
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

export default EditOrderPage;
