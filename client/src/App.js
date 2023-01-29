import { Routes, Route } from "react-router-dom";
import OrderManagementPage from "./pages/OrderManagement/OrderManagementPage";
import NewOrderPage from "./pages/NewOrder/NewOrderPage";
import EditOrderPage from "./pages/EditOrder/EditOrderPage";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" index element={<OrderManagementPage />} />
          <Route path="/new" element={<NewOrderPage />} />
          <Route path="/:id/edit" element={<EditOrderPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
