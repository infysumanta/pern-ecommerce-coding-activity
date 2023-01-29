import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditIcon from "./icon/EditIcon";
import DeleteIcon from "./icon/DeleteIcon";
import moment from "moment";
import { toast } from "react-hot-toast";
const OrderManagementPage = () => {
  const [orders, setOrders] = useState();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const fetchOrders = async () => {
    const { data } = await axios.get(`/api/orders?search=${search}`);
    setOrders(data);
  };
  useEffect(() => {
    fetchOrders();
  }, [search]);
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`/api/orders/${id}`);
      if (data.success) {
        toast.success(data?.message);
        fetchOrders();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  const editHandler = (id) => {
    navigate(`/${id}/edit`);
  };
  return (
    <div className="w-1/2 m-auto mt-20">
      <div className="bg-white rounded-md shadow-md p-4">
        <div className="flex justify-between  items-center">
          <div className="font-bold text-2xl">Order Management</div>
          <div className="search-order w-2/5">
            <input
              type="text"
              placeholder="Search Order"
              className="search_order"
              onChange={(e) => setSearch(e.target.value.trim())}
            />
          </div>
        </div>
        <div className="mt-5">
          <div className="table-container">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Order Description</th>
                  <th>Count of Products</th>
                  <th>Created Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order, index) => (
                    <tr key={index}>
                      <td> {order.id}</td>
                      <td> {order.description}</td>
                      <td> {order.productCount}</td>
                      <td>{moment(order.createdAt).format("YYYY-MM-DD")}</td>
                      <td className="text-center">
                        <button
                          className="edit_btn mr-5"
                          onClick={() => {
                            editHandler(order.id);
                          }}
                        >
                          <EditIcon />
                        </button>
                        <button
                          className="delete_btn"
                          onClick={() => {
                            deleteHandler(order.id);
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer">
          <button onClick={() => navigate("/new")} className="new_order_btn">
            New Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderManagementPage;
