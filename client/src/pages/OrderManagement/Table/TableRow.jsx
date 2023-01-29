import React from "react";
import EditIcon from "../icon/EditIcon";
import DeleteIcon from "../icon/DeleteIcon";
import moment from "moment";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const TableRow = ({ order, fetchOrders }) => {
  const navigate = useNavigate();
  /**
   * deleteHandler function deletes the order from the database.
   */
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`/api/orders/${id}`);
      if (data.success) {
        toast.success(data?.message);
        /* Calling the fetchOrders function that is passed in as a prop. */
        fetchOrders();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  /**
   * When the editHandler function is called, it will navigate to the edit page of the id that was passed
   * in.
   */
  const editHandler = (id) => {
    navigate(`/${id}/edit`);
  };
  return (
    <tr>
      <td> {order.id}</td>
      <td> {order.description}</td>
      <td> {order.productCount}</td>
      {/* Formatting the date to a specific format.  */}
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
  );
};

export default TableRow;
