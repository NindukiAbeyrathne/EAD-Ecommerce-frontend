import "./App.css";
import Header from "./common/header/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import your pages
import VendorManagementPage from "./common/pages/mock_pages/mock_pg_vendor";
import InventoryManagementPage_mock from "./common/pages/mock_pages/mock_pg_inventry";
import ProductManagementPage from "./common/pages/ProductManagementPage";
import OrderManagement from "./common/pages/OrderManagement";
import UserForm from "./common/pages/Login/UserForm";
import AdminDashboard from "./common/pages/Login/AdminDashboard"; // Admin Dashboard
import AdminManageUsersPage from "./common/pages/Login/AdminManageUsersPage"; // Import Admin Manage Users Page
import VendorDashboard from "./common/pages/Login/VendorDashboard"; // Vendor Dashboard
import ProtectedRoute from "./common/pages/ProtectedRoute"; // ProtectedRoute component

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          {/* Redirect root to the UserForm */}
          <Route path="/" element={<Navigate to="/UserForm" />} />

          {/* Public route */}
          <Route path="/UserForm" element={<UserForm />} />

          {/* Protected routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-users"
            element={
              <ProtectedRoute>
                <AdminManageUsersPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/inventory"
            element={
              <ProtectedRoute>
                <InventoryManagementPage_mock />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <ProductManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute>
                <OrderManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor/dashboard"
            element={
              <ProtectedRoute>
                <VendorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendors"
            element={
              <ProtectedRoute>
                <VendorManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductManagementPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
