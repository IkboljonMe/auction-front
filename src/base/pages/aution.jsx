import React, { useContext, useEffect, useReducer, useState } from "react";
import AuctionItem from "../components/itemAution";
import Loading from "../components/loading";
import ErrorPage from "../components/errorPage";
import { Store } from "../context/Store";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { GrAdd } from "react-icons/gr";
import { Tilt } from "react-tilt";
import "../styles/auction.css";
import Footer from "./footer";
const initialState = {
  products: [],
  loading: true,
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function AuctionPage() {
  const [{ loading, error, products }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const {
    state: { userInfo },
  } = useContext(Store);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const response = await axios.get("/api/auctions"); // replace with your API endpoint
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      } catch (err) {
        console.log(err);
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchProducts();
  }, []);

  const [auctions, setAuctions] = useState([]);

  const handleDeleteAuction = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        // eslint-disable-next-line
        const { data } = await axios.delete(`/api/auctions/${id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setAuctions(auctions.filter((auction) => auction.id !== id));
        dispatch({
          type: "FETCH_SUCCESS",
          payload: products.filter((product) => product._id !== id),
        });
        toast.success("Auction Deleted!");
      } catch (error) {
        toast.error(error);
      }
    }
  };

  return (
    <div className="auction__background h-screen">
      <div className="flex justify-center pt-10">
        {userInfo && userInfo.isSeller ? (
          <Link
            to="/create-auction"
            className="bgColar flex alignICenter hover:bg-gray-200 hover:text-cyan-600 duration-200 sm:mr-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <GrAdd size={20} className="mr-2 pt-7 items-center" /> Click here to
            add Auction
          </Link>
        ) : (
          <></>
        )}
      </div>
      <main className="container mx-auto py-8">
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorPage />
        ) : products.length > 0 ? (
          <div className="grid   grid-cols-1  lg:grid-cols-2 my-4 gap-10">
            {products.reverse().map((product) => (
              <Tilt
                options={{
                  max: 20,
                  transition: 1,
                  scale: 1.05,
                  speed: 1500,
                }}
              >
                <div className="bg-inherit  py-2 " key={product._id}>
                  {(product.bids.length > 0 &&
                    product.bids[product.bids.length - 1]?.bidder) ===
                  userInfo?.name ? (
                    <AuctionItem
                      key={product._id}
                      id={product._id}
                      title={product.title}
                      imageUrl={product.imageUrl}
                      endDate={product.endDate}
                      currentBid={product.currentBid}
                      highestBidder={userInfo.name}
                      handleDeleteAuction={() =>
                        handleDeleteAuction(product._id)
                      }
                    />
                  ) : (
                    <AuctionItem
                      key={product._id}
                      id={product._id}
                      title={product.title}
                      imageUrl={product.imageUrl}
                      endDate={product.endDate}
                      currentBid={product.currentBid}
                      highestBidder="NoBids"
                      handleDeleteAuction={() =>
                        handleDeleteAuction(product._id)
                      }
                    />
                  )}
                </div>
              </Tilt>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <h2 className="text-2xl font-semibold mb-2">No auctions found!</h2>
            <p className="text-gray-500">
              Please check back later for more auctions.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default AuctionPage;
