import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../../Store";
import "./header.css";
import { FaShoppingCart, FaUser, FaUserAlt } from "react-icons/fa";

export default function Header() {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const searchClicked = (e) => {
    navigate(text ? `/search/?query=${text}` : "/");
    setText("");
  };

  const handleTextChange = (value) => {
    setText(value);
  };

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

  function toggleDropdownAdmin() {
    setIsOpenAdmin(!isOpenAdmin);
  }

  function signoutHandler() {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOutsideClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <ToastContainer position="bottom-center" limit={1} />
      <header className="shadow-lg p_fixed bgBisque">
        <div className="container mx-auto flex flex-wrap p-5 flex-col  md:flex-row items-center">
          <Link
            to="/"
            className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 mb-0 md:mb-0"
          >
            <span className="ml-3 text-3xl font-bold">
              <span className="text-base-500">AEH</span>Bidding
            </span>
          </Link>

          <nav className="flex lg:w-2/5 flex-wrap lg:justify-end items-center text-base md:ml-auto">
            <Link to="/auction" className="relative inline-flex items-center">
              <span className="relative inline-flex items-center rounded px-2.5 py-1.5 font-medium">
                <span className="text-gray-600 text-lg hover:text-gray-900">
                  Auction
                </span>
              </span>
            </Link>

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

            {userInfo && userInfo.isSeller && (
              <div className="mr-4">
                {isMenuOpen && (
                  <div
                    onClick={handleOutsideClick}
                    className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg right-4 mt-2 w-auto left-auto"
                  >
                    <div className="px-4 py-3 text-sm text-gray-900 mt-1 whitespace-normal">
                      <div className="font-medium truncate">
                        {userInfo.email}
                      </div>
                    </div>
                    <ul
                      className="py-2 text-sm text-gray-700"
                      aria-labelledby="dropdownUserAvatarButton"
                    ></ul>
                  </div>
                )}
              </div>
            )}

            {userInfo && userInfo.isAdmin && (
              <div className="hover:text-gray-900 mr-6">
                <button
                  id="dropdownUserAvatarButton"
                  data-dropdown-toggle="dropdownAvatar"
                  className="flex items-center mr-2 hover:text-gray-900 focus:outline-none cursor-pointer"
                  onClick={toggleDropdownAdmin}
                >
                  Admin &nbsp;
                  <i className="fas fa-angle-down"></i>
                </button>
                {isOpenAdmin && (
                  <div
                    id="dropdownAvatar"
                    className="absolute bgBisque borderDark z-10 divide-y rounded-lg shadow-lg right-0 mt-2 sm:left-auto"
                  >
                    <div className="px-4 wMd py-3 text-lg text-black mt-1">
                      <span className="fs-1 text-black fWeight">
                        {userInfo.name}
                      </span>
                      <div className="font-medium ">{userInfo.email}</div>
                    </div>

                    <div className="py-2">
                      <Link
                        to="/admin/users"
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:text-black"
                      >
                        Manage Users
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

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
                        Sign out
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signin" className="mr-5 hover:text-gray-900">
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
