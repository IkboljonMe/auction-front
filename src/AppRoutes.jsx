import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./base/pages/home";
import Header from "./base/pages/header";
import Login from "./base/pages/login";
import Register from "./base/pages/register";
import CartPage from "./base/pages/cart";
import Address from "./base/pages/adress";
import PaymentMethod from "./base/pages/payMethod";
import PlaceOrder from "./base/pages/placeOrder";
import ProfilePage from "./base/pages/profile";
import ProtectedRoute from "./base/components/protectedRoute";
import AuctionPage from "./base/pages/aution";
import CreateAuction from "./base/pages/createdAution";
import AuctionDetail from "./base/pages/autionDetail";
import Footer from "./base/pages/footer";

const AppRoutes = () => {
  return (
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
            <Address />
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
        path="/profile"
        element={
          <>
            <Header />
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
            <Footer />
          </>
        }
      />

      <Route
        path="/auction"
        element={
          <>
            <Header />
            <AuctionPage />
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
  );
};

export default AppRoutes;
