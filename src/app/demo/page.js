"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FormQuestionViewer from "../components/client/formQuestionViewer";

export default function DemoPage() {
  const searchParams = useSearchParams();
  const file = searchParams.get("file");
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!file) return;
    setLoading(true);
    fetch(`/api/getForm?file=${file}`)
      .then((r) => r.json())
      .then((data) => {
        if (data && data.survey && data.survey[0]) {
          // convert to internal shape used by viewer
          const s = data.survey[0];
          const details = s.surveyDetails.map((d) => ({
            title: d.qesTitle,
            type: d.qesType === "singleChoice" ? "single" : d.qesType === "multiChoice" ? "multiple" : "short",
            choices: Array.isArray(d.qesValue) ? d.qesValue : [],
            answer: typeof d.qesValue === "string" ? d.qesValue : "",
          }));
          setSurvey({ ...s, surveyDetails: details });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [file]);

  const handleAnswer = (idx, val) => {
    setAnswers((prev) => ({ ...prev, [idx]: val }));
  };

  const handleSubmit = async () => {
    const payload = {
      file,
      submittedAt: Date.now(),
      responses: answers,
    };

    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      alert("Responses submitted. Thank you!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit responses");
    }
  };

  if (!file) return <div className="p-6">No file specified</div>;
  if (loading) return <div className="p-6">Loading...</div>;
  if (!survey) return <div className="p-6">Survey not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col font-sans p-6">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold">{survey.surveyTitle}</h2>
        </div>

        {survey.surveyDetails.map((q, idx) => (
          <FormQuestionViewer key={idx} question={q} index={idx} onAnswer={handleAnswer} />
        ))}

        <div className="pt-4">
          <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
