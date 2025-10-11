"use client"

import { useState } from 'react';

export default function UserProfile({ email }) {
  const [open, setOpen] = useState(false);
  const initials = email ? email.slice(0, 2).toUpperCase() : 'NA';

  return (
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
