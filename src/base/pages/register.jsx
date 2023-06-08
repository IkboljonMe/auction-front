import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Hn from "../assets/hn.png";
import avatar from "../assets/avatar.svg";
import axios from "axios";
import { Store } from "../context/Store";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getError } from "../helpers/utils";
import "../styles/auth.css";
function Register() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one uppercase,lowercase letter, and one special character."
      );
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const { data } = await axios.post("/api/users/signup", {
        name,
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
        <title>Sign Up-AuctionHUB</title>
      </Helmet>

      <h2 className="absolute top-[5%] right-[5%] text-3xl font-bold">
        <Link to={"/"}>
          <i className="fas fa-times coral hover:animate-pulse delay-500"></i>
        </Link>
      </h2>
      <form
        className="flex w-full h-screen flex-col gap-10 justify-center items-center "
        onSubmit={submitHandler}
      >
        <h2 className="my-8 font-display font-bold text-3xl text-gray-700 text-center">
          Register
        </h2>
        <div className="relative font-sans">
          <i className="fa fa-user-tie absolute coral"></i>
          <input
            type="text"
            placeholder="Name"
            className="inputFocus pl-8 w-64 border-b-2 font-display outline-none  transition-all duration-500"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="relative mt-8 font-sans">
          <i className="fa fa-envelope absolute coral"></i>
          <input
            type="email"
            placeholder="Email"
            className="pl-8 w-64 border-b-2 inputFocus font-display outline-none  transition-all duration-500"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative mt-8 font-sans">
          <i className="fa fa-lock absolute coral"></i>
          <input
            type="password"
            placeholder="Password"
            className="inputFocus pl-8 w-64 border-b-2 font-display outline-none  transition-all duration-500"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="relative mt-8 font-sans">
          <i className="fa fa-shield-alt absolute coral"></i>
          <input
            type="password"
            placeholder="Confirm Password"
            className="inputFocus pl-8 w-64 border-b-2 font-display outline-none  transition-all duration-500"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="flex text-center">
          <Link
            to={`/signin?redirect=${redirect}`}
            className="self-start py-4 mt-4 mr-4 text-gray-600 font-semibold opacity-75 hover:opacity-100 transition-all duration-500"
          >
            Already have an account? <br /> Sign In
          </Link>
        </div>
        <button
          type="submit"
          className="py-3 px-20 bgCoral rounded-full font-semibold uppercase text-lg mt-1 transform hover:translate-y-1 transition-all duration-500"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
