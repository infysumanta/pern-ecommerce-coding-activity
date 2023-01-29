import React, { useEffect, useState } from "react";
import axios from "axios";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

const TableData = ({ search }) => {
  const [orders, setOrders] = useState();
  /**
   * fetches order data from the server as per the search parameters pass from props
   * endpoint /api/orders?search=${search}
   */
  const fetchOrders = async () => {
    const { data } = await axios.get(`/api/orders?search=${search}`);
    setOrders(data);
  };

  /* calling when the search value changes. */
  useEffect(() => {
    fetchOrders();
  }, [search]);

  return (
    <div className="table-container">
      <table className="table-auto w-full">
        <TableHead />
        <tbody>
          {orders &&
            orders.map((order) => (
              <TableRow
                key={order.id}
                order={order}
                fetchOrders={fetchOrders}
              />
            ))}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
