import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import Main from "./Main";
import CartRoute from "./CartRoute";
import ShippingRoute from "./ShippingRoute";
import PaymentRoute from "./PaymentRoute";
import AuctionRoute from "./AuctionRoute";
import CreateAuctionRoute from "./CreateAuctionRoute";
import AuctionIdRotue from "./AuctionIdRotue";
import PlaceOrderRoute from "./PlaceOrderRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/cart" element={<CartRoute />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/shipping" element={<ShippingRoute />} />
      <Route path="/payment" element={<PaymentRoute />} />
      <Route path="/placeorder" element={<PlaceOrderRoute />} />
      <Route path="/auction" element={<AuctionRoute />} />
      <Route path="/create-auction" element={<CreateAuctionRoute />} />
      <Route path="/auctions/:id" element={<AuctionIdRotue />} />
    </Routes>
  );
};

export default AppRoutes;
