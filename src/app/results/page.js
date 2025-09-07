"use client";

import { useEffect, useState } from "react";

export default function Results() {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/getData");
      const data = await res.json();
      setResponses(data);
    }
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Survey Results</h1>
      <ul className="mt-4">
        {responses.map((r, i) => (
          <li key={i} className="border p-2 my-2 rounded">
            <strong>{r.name}</strong>: {r.feedback}
          </li>
        ))}
      </ul>
    </div>
  );
}
