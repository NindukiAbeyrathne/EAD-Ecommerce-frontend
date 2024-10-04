import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./common/header/Header";

// Import your pages
import VendorManagementPage from "./common/pages/mock_pages/mock_pg_vendor";
import InventoryManagementPage_mock from "./common/pages/mock_pages/mock_pg_inventry";
import ProductManagementPage from "./common/pages/admin_pages/ProductManagementPage";
import OrderManagement from "./common/pages/admin_pages/OrderManagement";
import UserForm from "./common/pages/Login/UserForm";
import AdminDashboard from "./common/pages/Login/admin/AdminDashboard"; // Admin Dashboard
import AdminManageUsersPage from "./common/pages/Login/AdminManageUsersPage"; // Import Admin Manage Users Page
import VendorDashboard from "./common/pages/Login/VendorDashboard"; // Vendor Dashboard
import ProtectedRoute from "./common/pages/ProtectedRoute"; // ProtectedRoute component
import VenderInventoryManagement from "./components/VenderInventoryManagement";
import VenderProductManagement from "./components/VenderProductManagement";
import VenderOrderManagement from "./components/VenderOrderManagement";
import VendorFeedback from "./components/VendorFeedback";
import CSRDashboard from "./common/pages/Login/CSRDashboard.jsx"; // CSR dashboard
import CSRManageUsers from "./common/pages/CSR_pages/ManageUsers.jsx";
import CSRManageOrders from "./common/pages/CSR_pages/ManageOrders.jsx";
import CSRViewVendorsProducts from "./common/pages/CSR_pages/ViewVendorsProducts.jsx";
import TrackDeliveries from "./common/pages/CSR_pages/TrackDeliveries.jsx";
import SignUpForm from "./common/pages/AuthPages/SignUp.js";
// Custom Hook to get current path
const usePath = () => {
  const location = useLocation();
  return location.pathname;
};

function App() {
  return (
    <>
      <Router>
        <AppWithRouter />
      </Router>
    </>
  );
}

// The component that renders inside Router
const AppWithRouter = () => {
  const currentPath = usePath();

  return (
    <>
      {/* Conditionally render Header except for UserForm route */}
      {currentPath !== "/UserForm" && currentPath!== "/signup" && <Header />}
      
      <Routes>
        {/* Redirect root to the UserForm */}
        <Route path="/" element={<Navigate to="/UserForm" />} />

        {/* Public route */}
        <Route path="/UserForm" element={<UserForm />} />
        <Route path="/signup" element={<SignUpForm />} />

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
        <Route
          path="/vendor/dashboard/products"
          element={<VenderProductManagement />}
        />
        <Route
          path="/vendor/dashboard/inventory"
          element={<VenderInventoryManagement />}
        />
        <Route
          path="/vendor/dashboard/orders"
          element={<VenderOrderManagement />}
        />
        <Route
          path="/vendor/dashboard/feedback"
          element={<VendorFeedback />}
        />
        <Route
          path="/csr/dashboard"
          element={
            <ProtectedRoute>
              <CSRDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/csr/manage-users"
          element={
            <ProtectedRoute>
              <CSRManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/csr/manage-orders"
          element={
            <ProtectedRoute>
              <CSRManageOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/csr/manage-vendor-products"
          element={
            <ProtectedRoute>
              <CSRViewVendorsProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/csr/manage-deliveries"
          element={
            <ProtectedRoute>
              <TrackDeliveries />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
