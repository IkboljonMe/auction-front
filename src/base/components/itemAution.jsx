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
    <div className="bg-white shadow-md rounded-md overflow-hidden" key={id}>
      <Helmet>
        <title>AuctionHUB</title>
      </Helmet>
      <div className="relative">
        <img
          src={imageUrl}
          alt="ItemImage"
          className=" pt-2 w-full h-48 object-contain hover:scale-105 duration-500"
        />

        {userInfo && userInfo.isAdmin && (
          <button className="absolute top-0 right-0" onClick={handleDelete}>
            <i className="fas fa-trash-alt text-gray-200 bg-transparent hover:text-gray-500 hover:bg-gray-200 duration-200 px-2 py-2"></i>
          </button>
        )}
      </div>
      <div className="px-4 py-2 flex flex-col  ">
        <h2 className="text-lg   font-bold text-gray-800">{title}</h2>
        <div className="flex justify-between">
          <p className="text-gray-600 fWeight">Current bid:</p>
          <p className="text-gray-600 fWeight">
            ${currentBid.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Time left:</p>
          <span className="font-bold">{timeLeft}</span>
        </div>

        {auctionEnded ? (
          <>
            {userInfo && highestBidder === userInfo.name ? (
              <Link to={`/auctions/${id}`}>
                <button
                  onClick={() => addToCartHandler(props)}
                  className="w-full py-2 px-4 bgColar hover:scale-105 text-white duration-200 rounded-md mt-4"
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
            <button className="w-full py-2 px-4 bg-gray-300 text-gray-600 duration-200 rounded-md mt-4 hover:bg-gray-400">
              Bid with other now 💵
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default AuctionItem;
