import axios from "axios";
import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import "../styles/cart.css";

export default function CartPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };
  console.log(cartItems);
  return (
    <div className="shoppingCart">
      <Helmet>
        <title>Cart-AEHBidding</title>
      </Helmet>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="mb-8 text-3xl text-white font-bold">Shopping Cart</h1>
      </main>
      <div className="checoutCart">
        <div className="heightLg">
          {cartItems.length === 0 ? (
            <div className="p-4 border rounded-md bg-gray-100 text-gray-700">
              Cart is empty.{" "}
              <Link to="/" className="text-cyan-600 font-bold">
                Go Shopping
              </Link>
            </div>
          ) : (
            <div className="bg-white border-b border-gray-200 sm:rounded-lg hover:transform hover:scale-105 backface-hidden shadow-lg duration-500">
              <div className="overflow-x-auto max-w-full">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50">
                    <tr className="hidden md:table-row">
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Product
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Total
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {cartItems.map((item) => (
                      <tr key={item._id}>
                        <td className="whitespace-nowrap px-6 py-4 md:px-2 md:py-3">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={item.imageUrl}
                                alt={item.title}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 whitespace-normal">
                                <Link to={`/auctions/${item.id}`}>
                                  {item.title}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          ${item.currentBid.toLocaleString("en-IN")}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          $
                          {(item.quantity * item.currentBid).toLocaleString(
                            "en-IN"
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => removeItemHandler(item)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <div className="heightLg">
          <div className="bg-white shadow-lg sm:rounded-lg md:-mt-3">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="mb-4 text-lg font-medium text-gray-900">
                Order Summary
              </h2>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Items:</span>
                <span className="text-gray-900 font-medium">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-500">Total:</span>
                <span className="text-gray-900 font-medium">
                  $
                  {cartItems
                    .reduce(
                      (acc, item) => acc + item.quantity * item.currentBid,
                      0
                    )
                    .toLocaleString("en-IN")}
                </span>
              </div>
              <button
                className={`w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded ${
                  cartItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
