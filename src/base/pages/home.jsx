import React, { useRef } from "react";
import "../styles/home.css";
import { Helmet } from "react-helmet-async";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import SwiperCore, { Autoplay } from "swiper";
import auction1 from "../assets/auction1.jpeg";
import auction2 from "../assets/auction2.jpeg";
import auction3 from "../assets/auction3.jpeg";
import "swiper/css";

SwiperCore.use([Autoplay]);

function Home() {
  const swiperRef = useRef(null);

  const handleSwiperReachEnd = () => {
    swiperRef.current.swiper.autoplay.stop();
    swiperRef.current.swiper.slideTo(0);
    swiperRef.current.swiper.autoplay.start();
  };

  return (
    <div className="home__component home flex flex-col h-screen justify-evenly">
      <Helmet>
        <title>AuctionHUB</title>
      </Helmet>

      <p className="text-white text-4xl  pb-6 flex justify-center">
        Welcom to
        <span className="ml-3 text-4xl font-bold">
          Auction
          <span style={{ color: "#ffA000", fontWeight: "900" }}>HUB</span>
        </span>
      </p>
      <div>
        <Swiper
          ref={swiperRef}
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{
            delay: 1000,
            reverseDirection: true,
          }}
          loop
          onReachEnd={handleSwiperReachEnd}
        >
          <SwiperSlide className="flex justify-center">
            <img src={auction1} alt="1"   />
          </SwiperSlide>
          <SwiperSlide className="flex justify-center">
            <img src={auction2} alt="2" />
          </SwiperSlide>
          <SwiperSlide className="flex justify-center">
            <img src={auction3} alt="3" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="flex justify-center ">
        <Link to="/auction">
          <button type="submit" className="bgCoral">
            Join Auction
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
