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
       <div className="titleButton">
       <h1 class="hero-text h-6 text-white">
          Welcome to <span class="highlight">AEH</span>Bidding
        </h1>
        <Link to="/auction">
          <button className="bg-blue-500 hover:bg-blue-700 text-white hover:text-white duration-200 sm:mr-2 text-cyan-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform hover:scale-10">
            Start bidding
          </button>
        </Link>

       </div>
        <img
          src="https://avatars.mds.yandex.net/i?id=530fea3ff0b9f5093c65c12900cc8b283516c00b-9229932-images-thumbs&n=13"
          alt="auction"
        ></img>
       
      </div>
    </div>
  );
}

export default Home;
