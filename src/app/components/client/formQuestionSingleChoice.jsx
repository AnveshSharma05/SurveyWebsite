//create component box 
//borrow a box template and add side icon boxes to it
//create multiple choice list inside left middle box templates container space
    //multiple choice list can be drag and drop
//add a delete and increase option inside the right container side space of the box template

//
import React, { useState } from "react";

/**
 * Survey Question Box
 * - Supports single choice, multiple choice, and short answer
 * - Fully responsive using TailwindCSS
 * - Provides delete box, duplicate box, add/remove options
 * - Protects layout using min-width + shrink rules
 */

const DEFAULT_BOX = {
  title: "Question",
  type: "single",
  choices: ["Option 1", "Option 2", "Option 3"],
  answer: "",
};

export default function BoxComponent({
  initialData = DEFAULT_BOX,
  onDelete,
  onDuplicate,
}) {
  const [title, setTitle] = useState(initialData.title);  
  const [type, setType] = useState(initialData.type);
  const [choices, setChoices] = useState(initialData.choices);
  const [answer, setAnswer] = useState(initialData.answer);

  const addChoice = () => setChoices([...choices, `Option ${choices.length + 1}`]);

  const updateChoice = (i, value) => {
    const copy = [...choices];
    copy[i] = value;
    setChoices(copy);
  };

  const removeChoice = (i) => {
    setChoices(choices.filter((_, idx) => idx !== i));
  };

  return (
  <div className="w-full py-6">
    <div className="w-full bg-white rounded-xl shadow-md p-6 border border-gray-200">

      {/* ------------------------------------------------- */}
      {/* TOP ROW: QUESTION TITLE + TYPE + ACTION ICONS     */}
      {/* ------------------------------------------------- */}
      <div className="flex justify-between items-start mb-4">

        {/* LEFT: Question Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your question"
          className="flex-1 text-xl font-semibold border-none focus:ring-0 bg-transparent"
        />

        {/* RIGHT: All Controls (Type dropdown + action icons) */}
        <div className="flex items-center space-x-3 ml-4 shrink-0">

          {/* Question Type Selector */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white 
                       focus:outline-none focus:border-indigo-500"
          >
            <option value="single">Single Choice</option>
            <option value="multiple">Multiple Choice</option>
            <option value="short">Short Answer</option>
          </select>

          {/* Duplicate Icon */}
          <button
            onClick={onDuplicate}
            className="p-1.5 rounded hover:bg-gray-100 text-gray-600"
            title="Duplicate"
          >
            <svg
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V2z"/>
              <path d="M1 5a2 2 0 0 1 2-2v9a3 3 0 0 0 3 3h7a2 2 0 0 1-2 2H3a3 3 0 0 1-3-3V5z"/>
            </svg>
          </button>

          {/* Delete Icon */}
          <button
            onClick={onDelete}
            className="p-1.5 rounded hover:bg-red-100 text-red-600"
            title="Delete"
          >
            <svg
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .5-.5zm2.5.5v6a.5.5 0 0 0 1 0v-6a.5.5 0 0 0-1 0zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0v-6z"/>
              <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13l-.4 8.2a2 2 0 0 1-2 1.8H5.4a2 2 0 0 1-2-1.8L3 4H2.5a1 1 0 0 1 0-2h3.1l.4-1.2A1 1 0 0 1 6 0h4a1 1 0 0 1 .9.6L11.4 2h3.1a1 1 0 0 1 1 1z"/>
            </svg>
          </button>

        </div>
      </div>

      {/* ------------------------------------------------- */}
      {/* MAIN CHOICES / ANSWERS SECTION                     */}
      {/* ------------------------------------------------- */}
      <div className="mt-4 space-y-3">
        {(type === "single" || type === "multiple") && (
          <div className="space-y-2">

            {choices.map((choice, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-md p-2">

                {/* Bullet (radio or checkbox) */}
                <input
                  type={type === "single" ? "radio" : "checkbox"}
                  disabled
                  className="h-4 w-4"
                />

                {/* Editable option text */}
                <input
                  value={choice}
                  onChange={(e) => updateChoice(idx, e.target.value)}
                  className="flex-1 border-b border-gray-300 bg-transparent focus:outline-none focus:border-indigo-500"
                />

                {/* Delete option */}
                <button
                  className="text-red-500 hover:text-red-700 text-lg font-bold"
                  disabled={choices.length === 1}
                  onClick={() => removeChoice(idx)}
                >
                  ✕
                </button>

              </div>
            ))}

            {/* Add option */}
            <button
              onClick={addChoice}
              className="text-indigo-600 text-sm font-medium hover:underline"
            >
              + Add option
            </button>
          </div>
        )}

        {type === "short" && (
          <input
            type="text"
            value={answer}
            placeholder="Short answer text"
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500 pb-1"
          />
        )}
      </div>

    </div>
  </div>
);

}
