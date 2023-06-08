import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Store } from "../context/Store";
import "../styles/header.css";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";
export default function Header() {
  const location = useLocation();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  // for profile dropdown
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdmin, setIsOpenAdmin] = useState(false);

  // eslint-disable-next-line

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isOpenAdmin]);

  function handleDocumentClick(e) {
    if (
      e.target.closest("#dropdownUserAvatarButton") ||
      e.target.closest("#dropdownAvatar")
    ) {
      return;
    }
    setIsOpen(false);
    setIsOpenAdmin(false);
  }

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function signoutHandler() {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  }
  console.log(userInfo);
  return (
    <>
      <ToastContainer position="bottom-center" limit={1} />
      <header className="w-full shadow-lg p_fixed bgBisque ">
        <div className=" container m-auto w-full justify-between flex  p-5 flex-col  md:flex-row items-center">
          <Link
            to="/"
            className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 mb-0 md:mb-0"
          >
            <span className="ml-3 text-3xl font-bold">
              Auction
              <span style={{ color: "#ffA000", fontWeight: "900" }}>HUB</span>
            </span>
          </Link>

          <Link
            to="/auction"
            className="text-3xl title-font font-medium  text-gray-900"
          >
            {location.pathname === "/auction"
              ? "Welocome to auction"
              : "Go to Auction"}
          </Link>

          <nav className="flex  flex-wrap  items-center text-base ">
            <div className="hover:text-gray-900 mr-6">
              {userInfo && (
                <button className="flex items-center mr-2 hover:text-gray-900 focus:outline-none cursor-pointer">
                  {userInfo.isAdmin ? "You are an Admin" : "You are not admin!"}
                </button>
              )}
            </div>
            <Link to="/cart" className="relative inline-flex items-center mr-6">
              <span className="relative inline-flex items-center rounded px-2.5 py-1.5 font-medium">
                {cart.cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-2 h-5 w-5 rounded-full bg-red-500 flex justify-center text-white text-xs items-center">
                    <span>
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  </span>
                )}
                <span className="ml-1.5 text-base text-gray-600 hover:text-gray-900">
                  <FaShoppingCart size={23} />
                </span>
              </span>
            </Link>
            {userInfo ? (
              <div className="relative group">
                <button
                  id="dropdownUserAvatarButton"
                  data-dropdown-toggle="dropdownAvatar"
                  className="flex items-center mr-2 hover:text-gray-900 focus:outline-none cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <FaUserAlt className="w-8 h-6 rounded-full hover:scale-110 duration-200" />
                </button>
                {isOpen && (
                  <div
                    id="dropdownAvatar"
                    className="absolute borderDark z-10 bgBisque divide-y rounded-lg shadow-lg right-0 mt-2 sm:left-auto"
                  >
                    <div className="px-4 py-3 fs-1 text-sm text-black wMd">
                      <div>{userInfo.name}</div>
                      <div className="font-medium truncate">
                        {userInfo.email}
                      </div>
                    </div>

                    <div className="py-2">
                      <Link
                        to="#signout"
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        onClick={signoutHandler}
                      >
                        Log out
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signin" className="mr-5 hover:text-gray-900">
                Log in
              </Link>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
