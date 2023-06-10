import React, { useContext, useReducer, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Store } from "../context/Store";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { getError } from "../helpers/utils";
import LoadingDots from "../components/dotsLoading";
import ErrorPage from "../components/errorPage";
import "../styles/createdAuction.css";

import Footer from "./footer";
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};

const CreateAuction = () => {
  const {
    state: { userInfo },
  } = useContext(Store);

  const [{ error, loadingUpdate, loadingUpload }, dispatch] = useReducer(
    reducer,
    {
      error: "",
    }
  );

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingBid, setStartingBid] = useState(100);
  const [imageUrl, setImageUrl] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      const { data } = await axios.post(
        "/api/auctions",
        {
          title,
          description,
          startingBid,
          imageUrl,
          endDate,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      toast.success(data.message);
      navigate("/auction");
      // Handle success
      dispatch({ type: "UPDATE_SUCCESS" });
    } catch (error) {
      toast(error.response.data.message);
      // Handle error
      dispatch({
        type: "UPDATE_FAIL",
        payload: getError(error),
      });
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const { data } = await axios.post("/api/upload", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: "UPLOAD_SUCCESS" });

      toast.success("Image uploaded successfully");
      setImageUrl(data.secure_url);
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
    }
  };

  return (
    <div className="auction__background h-screen flex flex-col justify-between">
      <Helmet>
        <title>Create Auction</title>
      </Helmet>

      {error ? (
        <ErrorPage />
      ) : (
        <div className="mx-auto max-w-7xl mt-0 bg-transparent">
          <h2 className="text-2xl text-blue-500 font-bold mb-4 text-center">
            Create New Auction
          </h2>
          <div className=" flex flex-wrap -mx-4">
            <div className="w-full md:w-full h-100 px-4">
              <div className=" shadow-lg p-4">
                <h3 className="text-lg flex justify-center text-blue-600 font-bold mb-2">
                  Auction Details
                </h3>
                <div className="mb-4 relative">
                  <input
                    type="text"
                    id="title"
                    value={title}
                    placeholder="Enter title"
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-lg border-2 border-blue-400 placeholder:text-blue-400 focus:placeholder:text-orange-500 focus:text-orange-500 text-blue-500  px-4 py-2 bg-inherit focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4 relative">
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="w-full rounded-lg border-2 border-blue-400 placeholder:text-blue-400 focus:placeholder:text-orange-500 focus:text-orange-500 text-blue-500  px-4 py-2 bg-inherit focus:outline-none focus:shadow-outline"
                  ></textarea>
                </div>
                <div className="mb-4 relative">
                  <input
                    type="number"
                    id="startingBid"
                    value={startingBid}
                    onChange={(e) => setStartingBid(e.target.value)}
                    placeholder="Starting bid"
                    className="w-full rounded-lg border-2 border-blue-400 placeholder:text-blue-400 focus:placeholder:text-orange-500 focus:text-orange-500 text-blue-500  px-4 py-2 bg-inherit focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4 relative">
                  <input
                    type="text"
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter img url"
                    className="w-full rounded-lg border-2 border-blue-400 placeholder:text-blue-400 focus:placeholder:text-orange-500 focus:text-orange-500 text-blue-500  px-4 py-2 bg-inherit focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div class="flex items-center justify-center w-full">
                  <label
                    for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-transparent hover:bg-gray-100 dark:border-blue-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        class="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      onChange={uploadFileHandler}
                      type="file"
                      class="hidden"
                    />
                  </label>
                </div>
                {loadingUpload && <LoadingDots />}

                <div className="mb-4 relative">
                  <input
                    type="datetime-local"
                    id="endDate"
                    value={endDate}
                    placeholder="End date"
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full  rounded-lg mt-4 text-blue-500 focus:text-orange-500 px-4 py-2 focus:outline-none bg-transparent border-2 border-blue-500 focus:shadow-outline"
                  />
                </div>
                <div className="rounded-lg shadow-lg p-4">
                  <h3 className="text-lg text-blue-500 flex justify-center font-bold mb-2">
                    Image Preview
                  </h3>
                  <div className="h-64 bg-transparent border-2 border-blue-500 py-2  rounded flex justify-center items-center">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="max-h-full object-contain"
                      />
                    ) : (
                      <p className="text-gray-400">No image provided</p>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <button
                    onClick={handleSubmit}
                    className="text-blue-500 hover:text-white hover:border-orange-600 hover:bg-orange-500 w-full border-2  border-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Create Auction
                  </button>
                  {loadingUpdate && <LoadingDots />}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default CreateAuction;
