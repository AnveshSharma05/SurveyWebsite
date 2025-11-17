"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ChevronDown, Image, Type, Video, Copy, Plus } from "lucide-react";

import UserProfile from "../components/client/UserProfile";
import BoxComponent from "../components/client/formQuestionSingleChoice";

export default function FormBuilder() {
  const [selectedType, setSelectedType] = useState("Short answer");
  const [showDropdown, setShowDropdown] = useState(false);
  const emailValue = useSelector((state) => state.survey.emailValue);

  const questionTypes = ["Single Choice", "Multiple Choice", "Short Answer"];

  // --------------------------------------------------------------------------
  // State that tracks all question boxes
  // --------------------------------------------------------------------------
  const [boxes, setBoxes] = useState([
    { id: crypto.randomUUID(), type: "Single Choice" },
    { id: crypto.randomUUID(), type: "Short Answer" },
  ]);

  // DELETE
  const deleteBox = (id) => {
    setBoxes((prev) => prev.filter((b) => b.id !== id));
  };

  // DUPLICATE
  const duplicateBox = (id) => {
    setBoxes((prev) => {
      const box = prev.find((b) => b.id === id);
      return [
        ...prev,
        {
          ...box,
          id: crypto.randomUUID(),
        },
      ];
    });
  };

  // ADD NEW QUESTION
  const addNewBox = () => {
    setBoxes((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: "Single Choice",
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col font-sans">
      {/* Header Bar */}
      <div className="bg-gray-800 text-white flex justify-between items-center px-6 py-3">
        <div className="flex items-center space-x-3">
          <div className="bg-white rounded-full p-2">
            <img src="/monkey-icon.png" alt="icon" className="h-6 w-6" />
          </div>
          <span className="font-semibold text-lg">Home</span>
        </div>
        <UserProfile email={emailValue} />
      </div>

      <div className="flex flex-1 bg-gray-50 p-6">
        {/* MAIN FORM AREA */}
        <div className="flex-1 max-w-4xl mx-auto shrink-0 space-y-6">
          {boxes.map((box) => (
            <BoxComponent
              key={box.id}
              onDelete={() => deleteBox(box.id)}
              onDuplicate={() => duplicateBox(box.id)}
            >
              {/* ----------------------------------------------------------
                  BOX CONTENT (THE QUESTION BODY)
                 ---------------------------------------------------------- */}
              <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  {/* Left section: Question + Options */}
                  <div className="flex-1 mb-4 md:mb-0">
                    <input
                      type="text"
                      placeholder="Question"
                      className="w-full border-b border-gray-300 text-lg font-medium focus:outline-none focus:border-blue-500 pb-1"
                    />

                    {/* Example radio options (matches your original) */}
                    {box.type === "Single Choice" && (
                      <div className="mt-3 space-y-2 text-sm">
                        <label className="flex items-center space-x-2">
                          <input type="radio" name={`q_${box.id}`} />
                          <span>Option 1</span>
                        </label>
                        <label className="flex items-center space-x-2 text-gray-600">
                          <input type="radio" disabled />
                          <span>
                            Add option or{" "}
                            <span className="text-blue-600 cursor-pointer">
                              add "Other"
                            </span>
                          </span>
                        </label>
                      </div>
                    )}

                    {box.type === "Short Answer" && (
                      <input
                        type="text"
                        placeholder="Short answer text"
                        className="mt-3 w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 pb-1 text-sm"
                      />
                    )}
                  </div>

                  {/* Right: Dropdown for type selection */}
                  <div className="relative w-52 border border-gray-300 rounded-md">
                    <button
                      onClick={() =>
                        setShowDropdown(showDropdown === box.id ? null : box.id)
                      }
                      className="w-full flex justify-between items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {box.type}
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {showDropdown === box.id && (
                      <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-10">
                        {questionTypes.map((type) => (
                          <button
                            key={type}
                            onClick={() => {
                              setBoxes((prev) =>
                                prev.map((b) =>
                                  b.id === box.id ? { ...b, type } : b
                                )
                              );
                              setShowDropdown(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                              box.type === type ? "bg-gray-50 font-medium" : ""
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </BoxComponent>
          ))}
        </div>

        {/* SIDEBAR ICONS (Add new question etc.) */}
        <div className="flex flex-col items-center space-y-3 ml-6 mt-6">
          <button
            onClick={addNewBox}
            className="p-2 border rounded hover:bg-gray-100"
          >
            <Plus className="h-4 w-4" />
          </button>

          <button className="p-2 border rounded hover:bg-gray-100">
            <Copy className="h-4 w-4" />
          </button>
          <button className="p-2 border rounded hover:bg-gray-100">
            <Type className="h-4 w-4" />
          </button>
          <button className="p-2 border rounded hover:bg-gray-100">
            <Image className="h-4 w-4" />
          </button>
          <button className="p-2 border rounded hover:bg-gray-100">
            <Video className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
