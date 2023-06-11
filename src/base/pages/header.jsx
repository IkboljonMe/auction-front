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
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdmin, setIsOpenAdmin] = useState(false);
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
            <Link to="/cart" className="relative inline-flex items-center mr-6">
              <span className="relative inline-flex items-center rounded px-2.5 py-1.5 font-medium">
                {cart.cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-2 h-5 w-5 rounded-full bg-red-500 text-white flex justify-center  text-xs items-center">
                    <span className="bg-inherit">
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
                    className="absolute bg-transparent md:bg-blue-500 z-10 border-2 border-transparent hover:border-white  rounded-lg shadow-lg right-0 t-10 mt-10 sm:left-auto"
                  >
                    <div className="  px-4 py-3 fs-1 text-sm text-black w-auto  md:wMd">
                      <div className="flex  flex-col md:flex-row justify-between font-bold text-white">
                        <p>Name:</p>
                        <p>{userInfo.name}</p>
                      </div>
                      <div className="flex flex-col md:flex-row  justify-between font-bold text-white">
                        <p>Email:</p>
                        <p>{userInfo.email}</p>
                      </div>
                      <div className="flex flex-col md:flex-row justify-between font-bold text-white">
                        <p>Admin:</p>
                        <p>{userInfo.isAdmin ? "Yes" : "No"}</p>
                      </div>
                    </div>

                    <div className="md:bg-blue-500 bg-transparent -pt-1">
                      <Link
                        className="flex justify-center "
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        <button className="hover:scale-110 border-2 rounded hover:border-red-500  px-6 py-1 border-transparent my-2 text-sm text-red-600 ">
                          Log out
                        </button>
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
