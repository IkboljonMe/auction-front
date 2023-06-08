import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import hn from "../assets/hn.png";
import avatar from "../assets/avatar.svg";
import axios from "axios";
import { Store } from "../context/Store";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getError } from "../helpers/utils";
import { FaUser } from "react-icons/fa";
import { AiTwotoneLock } from "react-icons/ai";
import "../styles/auth.css";
function Login() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/signin", {
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="relative">
      <ToastContainer position="bottom-center" limit={1} />
      <Helmet>
        <title>Sign In-HUB</title>
      </Helmet>

      <h2 className="absolute top-[5%] right-[5%] text-3xl font-bold">
        <Link to={"/"}>
          <i className="fas fa-times coral hover:animate-pulse delay-500"></i>
        </Link>
      </h2>

      <img
        src={hn}
        alt="hn"
        className="fixed hidden lg:block inset-0 h-full"
        style={{ zIndex: "-1" }}
      />
      <div className="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
        <div></div>
        <form
          className="flex flex-col justify-center items-center w-1/2"
          onSubmit={submitHandler}
        >
          <img src={avatar} className="w-32" alt="avatar" />
          <h2 className="my-8 font-display font-bold text-3xl text-gray-700 text-center">
            Welcome to you Auction
          </h2>
          <div className="relative font-sans">
            <FaUser size={25} className="absolute faUser" />

            <input
              type="email"
              placeholder="Email"
              className="inputFocus w-80 p-2 px-6 border-2 font-display outline-none  transition-all duration-500"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative mt-8">
            <AiTwotoneLock size={27} className="absolute faUser" />
            <input
              type="password"
              placeholder="Password"
              className="inputFocus w-80 p-2 px-8 border-2 font-display outline-none  transition-all duration-500"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex">
            <Link
              to={`/signup?redirect=${redirect}`}
              className="self-start py-4 mt-4 mr-4 text-gray-600  font-semibold opacity-75 hover:opacity-100 transition-all duration-500"
            >
              New Customer?
            </Link>
          </div>
          <button type="submit" className="bgCoral">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
