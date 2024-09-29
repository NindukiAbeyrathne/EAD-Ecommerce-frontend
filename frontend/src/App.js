import "./App.css";
import Header from "./common/header/Header";
import {
  BrowserRouter as Router,
  Routes, // React Router v6 uses Routes
  Route,
} from "react-router-dom";
// import InventoryManagementPage from './pages/InventoryManagementPage';
import VendorManagementPage from "./common/pages/mock_pages/mock_pg_vendor";
import InventoryManagementPage_mock from "./common/pages/mock_pages/mock_pg_inventry";
import ProductManagementPage from "./common/pages/ProductManagementPage";
import UserForm from "./common/pages/Login/UserForm";
import AdminDashboard from "./common/pages/Login/AdminDashboard";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/inventory" element={<InventoryManagementPage_mock />} />
          <Route path="/vendors" element={<VendorManagementPage />} />
          <Route path="/products" element={<ProductManagementPage />} />
          <Route path="/UserForm" element={<UserForm />} />
          {/* Add more routes for other pages as needed */}

          {/* Admin dashboard route */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
