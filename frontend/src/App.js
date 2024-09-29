import "./App.css";
import Header from "./common/header/Header";
import {
  BrowserRouter as Router,
  Routes, // React Router v6 uses Routes
  Route,
} from "react-router-dom";

// Import your pages
import VendorManagementPage from "./common/pages/mock_pages/mock_pg_vendor";
import InventoryManagementPage_mock from "./common/pages/mock_pages/mock_pg_inventry";
import ProductManagementPage from "./common/pages/ProductManagementPage";
import UserForm from "./common/pages/Login/UserForm";
import AdminDashboard from "./common/pages/Login/AdminDashboard"; // Admin Dashboard
import AdminManageUsersPage from "./common/pages/Login/AdminManageUsersPage"; // Import Admin Manage Users Page
import VendorDashboard from "./common/pages/Login/VendorDashboard";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          {/* Public routes */}
          <Route path="/inventory" element={<InventoryManagementPage_mock />} />
          <Route path="/vendors" element={<VendorManagementPage />} />
          <Route path="/products" element={<ProductManagementPage />} />

          <Route path="/UserForm" element={<UserForm />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route
            path="/admin/manage-users"
            element={<AdminManageUsersPage />}
          />
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
