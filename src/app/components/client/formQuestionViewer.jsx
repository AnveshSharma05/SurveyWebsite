"use client";

import React, { useState } from "react";

export default function FormQuestionViewer({ question, index, onAnswer }) {
  const [value, setValue] = useState(
    question.type === "short" ? question.answer || "" : question.choices ? [] : []
  );

  const handleSingleChange = (val) => {
    setValue(val);
    onAnswer(index, val);
  };

  const handleMultiChange = (choice) => {
    const next = Array.isArray(value) ? [...value] : [];
    const idx = next.indexOf(choice);
    if (idx > -1) next.splice(idx, 1);
    else next.push(choice);
    setValue(next);
    onAnswer(index, next);
  };

  const handleShortChange = (e) => {
    setValue(e.target.value);
    onAnswer(index, e.target.value);
  };

  return (
    <div className="w-full py-6">
      <div className="w-full bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="mb-4">
          <div className="text-lg font-semibold">{question.title}</div>
        </div>

        <div className="mt-4 space-y-3">
          {(question.type === "single" || question.type === "multiple") && (
            <div className="space-y-2">
              {question.choices.map((choice, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-3 bg-gray-50 rounded-md p-2"
                >
                  <input
                    type={question.type === "single" ? "radio" : "checkbox"}
                    name={`q-${index}`}
                    checked={
                      question.type === "single"
                        ? value === choice
                        : Array.isArray(value) && value.includes(choice)
                    }
                    onChange={() =>
                      question.type === "single"
                        ? handleSingleChange(choice)
                        : handleMultiChange(choice)
                    }
                    className="h-4 w-4"
                  />

                  <div className="flex-1">{choice}</div>
                </label>
              ))}
            </div>
          )}

          {question.type === "short" && (
            <input
              type="text"
              value={value}
              onChange={handleShortChange}
              placeholder="Your answer"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500 pb-1"
            />
          )}
        </div>
      </div>
    </div>
  );
}
