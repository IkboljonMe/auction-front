import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./base/pages/Home/Home";
import Header from "./base/pages/Header/Header";
import LoginPage from "./base/pages/SignIn/SignIn";
import RegisterPage from "./base/pages/SignUp/SignUp";
import CartPage from "./base/pages/CartPage/CartPage";
import OrderPage from "./base/pages/OrderPage/OrderPage";
import AddressPage from "./base/pages/AddressPage/AddressPage";
import PaymentMethod from "./base/pages/PaymentMethod/PaymentMethod";
import PlaceOrder from "./base/pages/PlaceOrder/PlaceOrder";
import OrderHistory from "./base/pages/OrderHistory/OrderHistory";
import ProfilePage from "./base/pages/ProfilePage/ProfilePage";
import ProtectedRoute from "./base/components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./base/pages/Dashboard/Dashboard";
import AdminRoute from "./base/components/AdminRoute/AdminRoute";
import OrderListPage from "./base/pages/OrderListPage/OrderListPage";
import UserListPage from "./base/pages/UserListPage/UserListPage";
import UserEditPage from "./base/pages/UserEditPage/UserEditPage";
import SellerRoute from "./base/components/SellerRoute/SellerRoute";
import Auction from "./base/pages/Auction/Auction";
import CreateAuction from "./base/pages/CreateAuction/CreateAuction";
import AuctionDetail from "./base/pages/AuctionDetails/AuctionDetail";

// Set the base URL for all axios requests
axios.defaults.baseURL =
  process.env.REACT_APP_API_PROXY || "http://localhost:5000";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />

        <Route
          path="/cart"
          element={
            <>
              <Header />
              <CartPage />
            </>
          }
        />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />

        <Route
          path="/shipping"
          element={
            <>
              <Header />
              <AddressPage />
            </>
          }
        />
        <Route
          path="/payment"
          element={
            <>
              <Header />
              <PaymentMethod />
            </>
          }
        />

        <Route
          path="/placeorder"
          element={
            <>
              <Header />
              <PlaceOrder />
            </>
          }
        />

        <Route
          path="/order/:id"
          element={
            <>
              <Header />
              <ProtectedRoute>
                <OrderPage />
              </ProtectedRoute>
            </>
          }
        />

        <Route
          path="/orderhistory"
          element={
            <>
              <Header />
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <Header />
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            </>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <>
              <Header />
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            </>
          }
        />

        <Route
          path="/admin/users"
          element={
            <>
              <Header />
              <AdminRoute>
                <UserListPage />
              </AdminRoute>
            </>
          }
        />

        <Route
          path="/admin/user/:id"
          element={
            <>
              <Header />
              <AdminRoute>
                <UserEditPage />
              </AdminRoute>
            </>
          }
        />

        <Route
          path="/auction"
          element={
            <>
              <Header />
              <Auction />
            </>
          }
        />

        <Route
          path="/create-auction"
          element={
            <>
              <Header />
              <CreateAuction />
            </>
          }
        />

        <Route
          path="/auctions/:id"
          element={
            <>
              <Header />
              <AuctionDetail />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
