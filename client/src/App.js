import { Routes, Route } from "react-router-dom";
import OrderManagementPage from "./pages/OrderManagement/OrderManagementPage";
import NewOrderPage from "./pages/NewOrder/NewOrderPage";
import EditOrderPage from "./pages/EditOrder/EditOrderPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<OrderManagementPage />} />
        <Route path="/new" element={<NewOrderPage />} />
        <Route path="/:id/edit" element={<EditOrderPage />} />
      </Routes>
    </>
  );
}

export default App;
