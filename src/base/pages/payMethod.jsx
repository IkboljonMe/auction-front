import { useContext, useEffect, useState } from "react";
import CheckoutSteps from "../components/checkoutSteps";
import { Helmet } from "react-helmet-async";
import "../styles/payMethod.css";
import { Store } from "../context/Store";
import { useNavigate } from "react-router";
import Footer from "./footer";
import { AiOutlineArrowRight } from "react-icons/ai";

function PaymentCard({ id, value, logo, label, selected, onClick }) {
  return (
    <div
      className={`border-2  border-gray-300 text-white rounded-lg p-20 cursor-pointer transition-colors duration-300 flex items-center justify-center flex-col lg:w-96 lg:h-64 ${
        selected
          ? "border-orange-600 shadow-md bg-orange-500 first-letter:"
          : " "
      }`}
      onClick={() => onClick(id)}
    >
      <input
        type="radio"
        name="payment-method"
        id={id}
        value={value}
        className="hidden"
      />
      <label
        htmlFor={id}
        className="flex flex-col items-center justify-center lg:h-full h-20 cursor-pointer"
      >
        <img
          className={`w-full h-auto filter grayscale ${
            selected ? "filter-none duration-500" : ""
          }`}
          src={logo}
          alt={label}
        />
        <span className="text-lg font-bold mt-4">{label}</span>
      </label>
    </div>
  );
}

export default function PaymentPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "PayPal"
  );

  // selected card
  const handleCardClick = (id) => {
    setPaymentMethod(id);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };

  return (
    <div className="global__background h-screen flex flex-col gap-10">
      <Helmet>
        <title>Payment-AuctionHUB</title>
      </Helmet>

      <div className=" h-5/6 mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl text-white font-bold mb-8">
          Select Payment Method
        </h1>
        <div className="flex flex-row  justify-evenly w-full gap-10 items-center">
          <div className="flex flex-col  gap-5 justify-center items-center">
            <PaymentCard
              id="Pekao"
              value="Pekao"
              logo="https://companieslogo.com/img/orig/PEO.WA-cc8df6b2.png?t=1644424056"
              label="Pekao"
              selected={paymentMethodName === "Pekao"}
              onClick={handleCardClick}
            />
            <PaymentCard
              id="Stripe"
              value="Stripe"
              logo="https://stripe.com/img/v3/home/social.png"
              label="Stripe"
              selected={paymentMethodName === "Stripe"}
              onClick={handleCardClick}
            />
          </div>
          <button
            className="border-orange-500 bg-orange-500 border-2 h-auto flex flex-row items-center gap-1  hover:bg-transparent text-white font-bold   py-2 px-8 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={submitHandler}
          >
            Continue
            <AiOutlineArrowRight />
          </button>
        </div>
      </div>
      <CheckoutSteps step1 step2 step3 />
      <div className="pt-6">
        <Footer />
      </div>
    </div>
  );
}
