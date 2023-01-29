import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableData from "./Table/TableData";

const OrderManagementPage = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

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
              value={search}
              onChange={(e) => setSearch(e.target.value.trim())}
            />
          </div>
        </div>
        <div className="mt-5">
          <TableData search={search} />
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
