import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Header from "./common/header/Header";

// Import your pages

import ProductManagementPage from "./common/pages/admin_pages/ProductManagementPage";
import OrderManagement from "./common/pages/admin_pages/OrderManagement";
import VenderOrderManagement from "./common/pages/vendor_pages/VendorOrder.js";
import UserForm from "./common/pages/Login/UserForm";
import AdminDashboard from "./common/pages/admin_pages/AdminDashboard.jsx"; // Admin Dashboard
import AdminManageUsersPage from "./common/pages/admin_pages/AdminManageUsersPage.jsx"; // Import Admin Manage Users Page
import VendorDashboard from "./common/pages/vendor_pages/VendorDashboard.jsx"; // Vendor Dashboard
import ProtectedRoute from "./common/pages/ProtectedRoute"; // ProtectedRoute component
import VenderInventoryManagement from "./components/VenderInventoryManagement";
import VenderProductManagement from "./components/VenderProductManagement";
import VendorFeedback from "./common/pages/vendor_pages/VendorFeedback.jsx";
import CSRDashboard from "./common/pages/Login/CSRDashboard.jsx"; // CSR dashboard
import CSRManageUsers from "./common/pages/CSR_pages/ManageUsers.jsx";
import CSRManageOrders from "./common/pages/CSR_pages/ManageOrders.jsx";
import CSRViewVendorsProducts from "./common/pages/CSR_pages/ViewVendorsProducts.jsx";
import TrackDeliveries from "./common/pages/CSR_pages/TrackDeliveries.jsx";
import SignUpForm from "./common/pages/AuthPages/SignUp.js";
import CreateProductPage from "./common/pages/vendor_pages/CreateProductPage.js";
import EditProductPage from "./common/pages/vendor_pages/EditProduct.js";
import NotificationPage from "./common/pages/vendor_pages/VendorNotificationPage.js";
import ProfilePage from "./common/pages/vendor_pages/Profile.js";
import ViewVendorsProducts from "./common/pages/CSR_pages/ViewVendorsProducts.jsx";
import CancellationRequests from "./common/pages/admin_pages/CancelRequest.js";

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
      {currentPath !== "/UserForm" && currentPath !== "/signup" && <Header />}

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
          path="/admin/cancel-requests"
          element={
            <ProtectedRoute>
              <CancellationRequests />
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
          path="/add-product"
          element={
            <ProtectedRoute>
              <CreateProductPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/inventory"
          element={
            <ProtectedRoute>
              {/* <InventoryManagementPage_mock /> */}
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
            <ProtectedRoute>{/* <VendorManagementPage /> */}</ProtectedRoute>
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
          path="/vendor/orders"
          element={<VenderOrderManagement />}
        />
        <Route path="/vendor/dashboard/feedback" element={<VendorFeedback />} />
        <Route path="/edit-product/:productId" element={<EditProductPage />} />
        <Route path="/vendor/notifications" element={<NotificationPage />} />
        <Route path="/csr/view-products" element={<ViewVendorsProducts />} />
        <Route path="/profile" element={<ProfilePage />} />

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
