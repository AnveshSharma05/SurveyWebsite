"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // for redirect after signup

const GetStartedButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // reset previous errors

    try {
      const response = await axios.post("/api/register", { email, password });
      console.log(response.data);

      if (response.data.message === "User registered successfully") {
        setShowModal(false);
        router.push("/login"); // redirect user to login page
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
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-2xl font-bold mb-4">Get Started</h2>

            {errorMessage && (
              <p className="text-red-500 mb-2">{errorMessage}</p>
            )}

            <form onSubmit={handleSubmit}>
              <label className="block mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full p-2 mb-4 border border-gray-400 rounded"
                required
              />

              <label className="block mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full p-2 mb-4 border border-gray-400 rounded"
                required
              />

              <button
                type="submit"
                className="bg-darkblue px-6 py-3 rounded-md hover:bg-lightblue font-semibold text-white w-full mb-2"
              >
                Submit
              </button>
            </form>

            <button
              className="bg-gray-400 px-6 py-3 rounded-md hover:bg-gray-500 font-semibold text-white w-full"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetStartedButton;
