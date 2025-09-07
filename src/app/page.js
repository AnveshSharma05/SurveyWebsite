"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, feedback }),
    });
    const data = await res.json();
    alert(data.message);
    setName("");
    setFeedback("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Survey Form</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Your feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
