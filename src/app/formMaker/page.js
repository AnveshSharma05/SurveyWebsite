"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronDown,
  Image,
  Type,
  Video,
  Copy,
  Plus,
  Save,
} from "lucide-react";

import UserProfile from "../components/client/UserProfile";
import BoxComponent from "../components/client/formQuestionSingleChoice";
//import surveyExport from "../components/client/surveyExport";

const DEFAULT_BOX = {
  title: "Question",
  type: "single",
  choices: ["Option 1", "Option 2", "Option 3"],
  answer: "",
};

export default function FormBuilder() {
  const [selectedType, setSelectedType] = useState("Short answer");
  const [showDropdown, setShowDropdown] = useState(false);
  const emailValue = useSelector((state) => state.survey.emailValue);
  const searchParams = useSearchParams();
  const formParam = searchParams.get("form");

  const questionTypes = ["Single Choice", "Multiple Choice", "Short Answer"];

  // --------------------------------------------------------------------------
  // State that tracks all question boxes
  // --------------------------------------------------------------------------
  const [boxes, setBoxes] = useState([
    { id: crypto.randomUUID(), ...DEFAULT_BOX },
    {
      id: crypto.randomUUID(),
      title: "Short Question",
      type: "short",
      choices: [],
      answer: "",
    },
  ]);

  // SURVEY TITLE
  const [surveyTitle, setSurveyTitle] = useState("My Survey");

  // LOAD FORM IF PARAM
  useEffect(() => {
    if (formParam) {
      fetch(`/api/getForm?file=${formParam}`)
        .then((res) => res.json())
        .then((data) => {
          const survey = data.survey[0];
          setSurveyTitle(survey.surveyTitle);
          const loadedBoxes = survey.surveyDetails.map((detail) => ({
            id: crypto.randomUUID(),
            title: detail.qesTitle,
            type:
              detail.qesType === "singleChoice"
                ? "single"
                : detail.qesType === "multiChoice"
                ? "multiple"
                : "short",
            choices: Array.isArray(detail.qesValue) ? detail.qesValue : [],
            answer: typeof detail.qesValue === "string" ? detail.qesValue : "",
          }));
          setBoxes(loadedBoxes);
        })
        .catch((err) => console.error("Failed to load form:", err));
    }
  }, [formParam]);

  // DELETE
  const deleteBox = (id) => {
    setBoxes((prev) => prev.filter((b) => b.id !== id));
  };

  // UPDATE
  const updateBox = (id, newData) => {
    setBoxes((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...newData } : b))
    );
  };

  // DUPLICATE
  const duplicateBox = (id) => {
    setBoxes((prevBoxes) => {
      const box = prevBoxes.find((b) => b.id === id);
      if (box) {
        const newBox = { ...box, id: crypto.randomUUID() };
        return [...prevBoxes, newBox];
      }
      return prevBoxes;
    });
  };

  // ADD NEW QUESTION
  const addNewBox = () => {
    setBoxes((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        ...DEFAULT_BOX,
      },
    ]);
  };

  // SAVE SURVEY
  const handleSave = async () => {
    const surveyData = {
      surveyId: `${emailValue}_${Date.now()}`,
      surveyTitle,
      surveyDescription: "",
      status: "save",
      surveyDetails: boxes.map((box) => ({
        qesTitle: box.title,
        qesValue: box.type === "short" ? box.answer : box.choices,
        qesType:
          box.type === "single"
            ? "singleChoice"
            : box.type === "multiple"
            ? "multiChoice"
            : "shortanswer",
      })),
    };

    try {
      const response = await fetch("/api/saveSurvey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailValue, survey: surveyData }),
      });
      const result = await response.json();
      if (result.success) {
        alert(`Survey saved as ${result.fileName}`);
      } else {
        alert("Failed to save survey");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving survey");
    }
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
          {/* SURVEY TITLE */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <input
              type="text"
              value={surveyTitle}
              onChange={(e) => setSurveyTitle(e.target.value)}
              placeholder="Enter survey title"
              className="w-full text-2xl font-bold border-none focus:ring-0 bg-transparent"
            />
          </div>

          {boxes.map((box) => (
            <BoxComponent
              key={box.id}
              initialData={box}
              onUpdate={(newData) => updateBox(box.id, newData)}
              onDelete={() => deleteBox(box.id)}
              onDuplicate={() => duplicateBox(box.id)}
            ></BoxComponent>
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

          <button
            onClick={handleSave}
            className="p-2 border rounded hover:bg-gray-100"
          >
            <Save className="h-4 w-4" />
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
