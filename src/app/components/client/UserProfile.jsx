"use client"

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; //used to create a unique id
import { useDispatch } from "react-redux";
import { setUniqueEmailId } from "../../../store/surveySlice";



export default function UserProfile({ email }) {
  const [open, setOpen] = useState(false);
  const initials = email ? email.slice(0, 2).toUpperCase() : 'NA';
  // Function to generate unique email number after user profile icon is created
  function generateUniqueNumber() {
    const timestamp = Date.now();
    const uniqueNumber = uuidv4() + timestamp;
  return uniqueNumber;
  }
  // Generate email ID, no database retreival for now
  const uniqueEmailId = generateUniqueNumber();
  console.log(uniqueEmailId); // Output: a unique number like "3e0a9b11-1689997800000"
  // Store email ID in redux state
  const dispatch = useDispatch();
  dispatch(setUniqueEmailId(uniqueEmailId));
  return (
    //create user profile button with dropdown menu
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-orange-200 text-gray-800 font-semibold rounded-full h-8 w-8 flex items-center justify-center hover:bg-orange-300"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg text-sm">
          <ul className="py-1">
            <li> 
              <button className="w-full text-left px-4 py-2 text-black hover:bg-gray-100">{email}</button>
            </li>
             <li> 
              <button className="w-full text-left px-4 py-2 text-black hover:bg-gray-100">ID: {uniqueEmailId}</button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 text-black hover:bg-gray-100">My account</button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 text-black hover:bg-gray-100">Sign out</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
