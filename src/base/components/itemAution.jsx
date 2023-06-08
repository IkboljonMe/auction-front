import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Store } from "../context/Store";
import { Tilt } from "react-tilt";
import "../styles/itemAuction.css";
function AuctionItem(props) {
  const {
    id,
    title,
    imageUrl,
    endDate,
    currentBid,
    highestBidder,
    handleDeleteAuction,
  } = props;
  const [timeLeft, setTimeLeft] = useState("");
  const [auctionEnded, setAuctionEnded] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems },
  } = state;
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((item) => item._id === id);

    const quantity = existItem ? existItem.quantity + 1 : 1;
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      const duration = (new Date(endDate) - new Date()) / 1000;
      if (duration <= 0) {
        setTimeLeft(`0d 0h 0m 0s`);
        setAuctionEnded(true);
      } else {
        const days = Math.floor(duration / (24 * 3600));
        const hours = Math.floor((duration % (24 * 3600)) / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [endDate]);

  const handleDelete = () => {
    handleDeleteAuction();
  };

  return (
    <div
      className="flex flex-col px-10 py-20 bg-transparent border-2 mx-auto lg:w-2/3 w-full border-white hover:border-4 hover:border-orange-600 shadow-md rounded-md overflow-hidden"
      key={id}
    >
      <Helmet>
        <title>AuctionHUB</title>
      </Helmet>
      <div className="">
        <img
          class="h-auto max-w-30 max-h-20 object-contain"
          src={imageUrl}
          alt="imae"
        />
        <h2 className="font-bold text-white justify-center flex">{title}</h2>
      </div>

      {userInfo && userInfo.isAdmin && (
        <button className="bg-inherit " onClick={handleDelete}>
          <i className="fas fa-trash-alt text-red-600 bg-transparent hover:text-red-900 hover:bg-gray-200 duration-200 px-2 py-2"></i>
        </button>
      )}

      <div className="px-4 py-2 flex flex-col ">
        <div className="flex justify-between">
          <p className="text-white ">Current bid:</p>
          <p className="text-white">${currentBid.toLocaleString("en-IN")}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-white">Time left:</p>
          <span className="font-bold text-white">{timeLeft}</span>
        </div>

        {auctionEnded ? (
          <>
            {userInfo && highestBidder === userInfo.name ? (
              <Link to={`/auctions/${id}`}>
                <button
                  onClick={() => addToCartHandler(props)}
                  className="w-full py-2 px-4 bg-green-700 hover:scale-105 text-white duration-200 rounded-md mt-4"
                >
                  You Win🎉
                </button>
              </Link>
            ) : (
              <button
                className="w-full py-2 px-4 cursor-not-allowed bg-gray-100 text-gray-400 duration-200 rounded-md mt-4"
                disabled
              >
                Sorry, Auction has Ended🚫
              </button>
            )}
          </>
        ) : (
          <Link to={userInfo ? `/auctions/${id}` : "/signin"}>
            <button className="w-full py-2 px-4  bg-orange-600 text-gray-600 duration-200 rounded-md mt-4 hover:bg-gray-400">
              Bid with other now 💵
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default AuctionItem;
