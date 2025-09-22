"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { toggle, setTrue, setFalse } from "../../../store/validEmail";

const GetStartedButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const isValidEmail = useSelector((state) => state.validEmail.value);
  const dispatch = useDispatch();

  // Validate email whenever it changes
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      dispatch(setFalse()); // empty email is invalid
    } else if (emailRegex.test(email)) {
      dispatch(setTrue()); // valid email
    } else {
      dispatch(setFalse()); // invalid email
    }
  }, [email, dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // reset previous errors

    if (!isValidEmail) {
      setErrorMessage("Please enter a valid email");
      return;
    }

    try {
      const response = await axios.post("/api/register", { email, password });
      console.log(response.data);

      if (response.data.message === "User registered successfully") {
        setShowModal(false);
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
      if (error.response?.data?.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Server error. Please try again later.");
      }
    }
  };

  return (
    <div>
      <button
        className="bg-darkblue px-6 py-3 rounded-md hover:bg-lightblue font-semibold text-white"
        onClick={() => setShowModal(true)}
      >
        Get started free
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              <IoMdClose className="text-2xl" />
            </button>
            <h2 className="text-2xl font-bold mb-4">Get Started</h2>

            {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}

            <form onSubmit={handleSubmit}>
              <label className="block mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full p-2 mb-2 border border-gray-400 rounded"
                required
              />

              {/* Only show this if email is invalid */}
              {!isValidEmail && email && (
                <div className="error-message text-red-500 mb-2">
                  Enter Valid Email Id
                </div>
              )}

              <button
                type="submit"
                className="bg-darkblue px-6 py-3 rounded-md hover:bg-lightblue font-semibold text-white w-full mb-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetStartedButton;
