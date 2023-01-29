import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ProductItem from "../../components/ProductItem";
const NewOrderPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState();
  const [description, setDescription] = useState("");

  useEffect(() => {
    /**
     * fetches products data from the server
     * endpoint api/products,
     */
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);

  /**
   * If the product's id matches the product's id, then return the product with the checked property set
   * to the opposite of what it was before.
   */
  const checkedProductHandler = (product) => {
    let productArray = products.map((prod) => {
      if (prod.id === product.id) {
        return { ...prod, checked: !prod.checked };
      }
      return prod;
    });

    setProducts(productArray);
  };

  /**
   * When the form is submitted, the description and products are sent to the server, and if the server
   * responds with a success message, the user is redirected to the home page.
   */
  const formSubmitHandler = async () => {
    try {
      const body = {
        orderDescription: description,
        products: JSON.stringify(products.filter((product) => product.checked)),
      };
      const { data } = await axios.post(`/api/orders/`, body);
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
  /**
   * When the user clicks the back button, the user will be navigated back to the order page.
   */
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
                products.map((product) => (
                  <ProductItem
                    product={product}
                    key={product.id}
                    checkedProductHandler={checkedProductHandler}
                  />
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
