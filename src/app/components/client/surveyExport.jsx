"use client"

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver";

export default function SurveyExport() {
  const emailValue = useSelector((state) => state.survey.emailValue);
  const surveyData = useSelector((state) => state.survey.survey);

  const [json, setJson] = useState({});

  useEffect(() => {
    setJson({
      email: emailValue,
      survey: surveyData,
    });
  }, [emailValue, surveyData]);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
    saveAs(blob, `survey_${emailValue}.json`);
  };

  return (
    <button onClick={handleExport}>Export Survey</button>
  );
}