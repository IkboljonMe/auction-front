import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./base/pages/home/home";
import Header from "./base/pages/header/header";
import Login from "./base/pages/login/login";
import Register from "./base/pages/register/register";
import CartPage from "./base/pages/cart/cart";
import OrderPage from "./base/pages/order/order";
import AddressPage from "./base/pages/address/adress";
import PaymentMethod from "./base/pages/payMethod/payMethod";
import PlaceOrder from "./base/pages/placeOrder/placeOrder";
import OrderHistory from "./base/pages/orderHistory/orderHistory";
import ProfilePage from "./base/pages/profile/profile";
import ProtectedRoute from "./base/components/protectedRoute/protectedRoute";
import AdminRoute from "./base/components/adminRoute/adminRoute";
import UserListPage from "./base/pages/userList/userList";
import UserEditPage from "./base/pages/editUser/editUser";
import Auction from "./base/pages/aution/aution";
import CreateAuction from "./base/pages/createAuction/createdAution";
import AuctionDetail from "./base/pages/auctionItems/autionItems";

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
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />

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
