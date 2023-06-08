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
import Footer from "./footer";

SwiperCore.use([Autoplay]);

function Home() {
  const swiperRef = useRef(null);

  const handleSwiperReachEnd = () => {
    swiperRef.current.swiper.autoplay.stop();
    swiperRef.current.swiper.slideTo(0);
    swiperRef.current.swiper.autoplay.start();
  };

  return (
    <>
      <div className="global__background gap-6 home flex flex-col lg:h-screen h-fulljustify-between">
        <Helmet>
          <title>AuctionHUB</title>
        </Helmet>
        <p className="text-white text-4xl  lg:pt-3  pt-20  flex justify-center">
          Welcom to
          <span className="ml-3 text-4xl font-bold">
            Auction
            <span style={{ color: "#ffA000", fontWeight: "900" }}>HUB</span>
          </span>
        </p>
        <div className="">
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
            <SwiperSlide className="flex flex-row ">
              <div className="w-full flex justify-center">
                <img className="" src={auction1} alt="1" />
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex flex-row ">
              <div className="w-full flex justify-center">
                <img className="" src={auction2} alt="2" />
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex flex-row ">
              <div className="w-full flex justify-center">
                <img className="" src={auction3} alt="3" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="flex justify-center ">
          <Link to="/auction">
            <button type="submit" className="bgCoral">
              <span className="text-white">Join Auction</span>
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
