"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { createSurvey } from "../../../store/surveySlice";

const GetStartedButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const emailValue = useSelector((state) => state.surveyItem.emailValue);
  const router = useRouter();

  // const isValidEmail = useSelector((state) => state.validEmail.value);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Email in Redux Store:", emailValue);
    if (!emailValue == "" || !emailValue == null){
      setShowModal(false);
      router.push("/surveyPage?email=" +emailValue);
    }
    // console.log("Is Valid Email:", isValidEmail);
  }, [emailValue]);
  const validEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false; 
    } else {
      return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailID = event.target.email.value;
    setEmail(emailID);

    setErrorMessage(""); // reset previous errors
    if (emailID === null || emailID === "") {
      setErrorMessage("Email cannot be empty");
      //dispatch(setFalse()); // empty email is invalid
    } 
    else if (!validEmail(emailID)){
      setErrorMessage("Enter Valid Email Id");
    } else{
      dispatch(createSurvey(emailID));
  };
}

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
            <form onSubmit={handleSubmit}>
              <label className="block mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                className="block w-full p-2 mb-2 border border-gray-400 rounded"
                required
              />
              <div className="error-message text-red-500 mb-2">
                  {errorMessage}
              </div>

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
