import React from "react";
import "./home.css";
import { Helmet } from "react-helmet-async";

import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home__component">
      <div className="text-center pb-4 pt-8">
        <Helmet>
          <title>AEHBidding</title>
        </Helmet>
      </div>
      <div className="imagContainer">
       <div className="">
       <h1 class="hero-text mb-30 h-6 text-white">
          Welcome to <span class="highlight">AEH</span>Bidding
        </h1>
        <Link to="/auction">
          <button className="bg-blue-500 hover:bg-blue-700 text-white hover:text-white duration-200 sm:mr-2 text-cyan-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform hover:scale-110">
            Start bidding
          </button>
        </Link>

       </div>
        <img
          src="https://geauction.com/wp-content/uploads/2018/07/5-Auction-Tips-for-Beginners2.jpg"
          alt="auction"
        ></img>
       
      </div>
    </div>
  );
}

export default Home;
