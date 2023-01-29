import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ProductItem from "../../components/ProductItem";

const EditOrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState();
  const [description, setDescription] = useState("");

  // Calling when id and navigate modified
  useEffect(() => {
    /**
     * fetches single order data by the id password with params and get the data from the server
     * endpoint /api/orders/:id
     */
    const fetchOrderData = async () => {
      const { data } = await axios.get(`/api/orders/${id}`);
      /* Setting the description state to the description of the order. */
      setDescription(data.description);
    };
    /*Calling the fetchOrderData function */
    fetchOrderData();
  }, [id, navigate]);

  // Calling when id and navigate modified
  useEffect(() => {
    /**
     * fetches products data from the server
     * endpoint /api/products/:id
     */
    const fetchProducts = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProducts(data);
    };
    /*Calling the fetchProducts function */
    fetchProducts();
  }, [id, navigate]);

  /**
   * If the product id matches the product id in the array, return the product with the checked property
   * set to the opposite of what it was before.
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
   * "formSubmitHandler" is a function that sends a PUT request to the server with the updated order
   * information.
   */
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
  /**
   * When the user clicks the backToOrder button, the user will be navigated to the home page.
   */
  const backToOrder = () => {
    navigate("/");
  };

  return (
    <div className="w-1/3 m-auto mt-20">
      <div className="bg-white rounded-md shadow-md p-4">
        <div className="flex justify-between items-center">
          <div className="font-bold text-2xl">Edit Order</div>
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

export default EditOrderPage;
