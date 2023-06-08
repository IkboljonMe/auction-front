import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/checkoutSteps";
import { Store } from "../context/Store";
import "../styles/adress.css";
import Footer from "./footer";

export default function Address() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [pinCode, setPinCode] = useState(shippingAddress.pinCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault(); // stops from reloading page on submit
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        pinCode,
        country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        pinCode,
        country,
      })
    );
    navigate("/payment");
  };

  return (
    <div className="global__background h-screen">
      <Helmet>
        <title>Shipping Address-AuctionHUB</title>
      </Helmet>

      <div className="flex justify-center  items-center context h-5/6">
        <div className="w50">
          <div className="text-center">
            <h1 className="text-2xl text-white font-bold my-4">
              Shipping Address
            </h1>
          </div>
          <form
            className="bg-inherit shadow-md rounded px-8 pt-6 pb-2 mb-4"
            onSubmit={submitHandler}
          >
            <div className="bg-inherit mb-6 relative">
              <input
                className="bg-inherit shadow appearance-none border rounded w-full py-4 px-5 placeholder:text-orange-400 text-orange-400 border-orange-500 leading-tight focus:outline-none focus:shadow-outline"
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Enter your full name"
              />
            </div>
            <div className="mb-6 relative">
              <input
                className="bg-inherit shadow appearance-none border rounded w-full py-4 px-5 placeholder:text-orange-400 text-orange-400 border-orange-500 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Enter your address"
              />
            </div>
            <div className="mb-6 relative">
              <input
                className="bg-inherit shadow appearance-none border rounded w-full py-4 px-5 placeholder:text-orange-400 text-orange-400 border-orange-500 leading-tight focus:outline-none focus:shadow-outline"
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                placeholder="Enter your city"
              />
            </div>
            <div className="mb-6 relative">
              <input
                className="bg-inherit shadow appearance-none border rounded w-full py-4 px-5 placeholder:text-orange-400 text-orange-400 border-orange-500 leading-tight focus:outline-none focus:shadow-outline"
                id="pinCode"
                type="text"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                required
                placeholder="Enter your pin code"
              />
            </div>
            <div className="mb-4 relative">
              <input
                className="bg-inherit shadow appearance-none border rounded w-full py-4 px-5 placeholder:text-orange-400 text-orange-400 border-orange-500 leading-tight focus:outline-none focus:shadow-outline"
                id="country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                placeholder="Enter your country"
              />
            </div>
            <div className="flex items-center justify-center mt-6">
              <button
                className="bgCoral text-white hover:bg-transparent bg-orange-500 font-bold py-2 px-4 rounded"
                type="submit"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
      <CheckoutSteps step1 step2 />
      <div className="pt-6">
        <Footer />
      </div>
    </div>
  );
}
