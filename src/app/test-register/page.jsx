"use client"; // client component since we will use useState and fetch

import { useState } from "react";

export default function TestRegisterPage() {
  const [message, setMessage] = useState("");

  const handleTest = async () => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Anvesh",
          email: "test@example.com",
          password: "123456",
        }),
      });

      const data = await res.json();
      setMessage(JSON.stringify(data));
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div className="p-8">
      <h1>Test Registration API</h1>
      <button
        onClick={handleTest}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Register Test User
      </button>
      {message && <pre className="mt-4">{message}</pre>}
    </div>
  );
}
