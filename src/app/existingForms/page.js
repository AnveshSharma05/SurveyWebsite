"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import SiteTemplate from "@/app/components/server/SiteTemplate";

export default function ExistingForms() {
  const [forms, setForms] = useState([]);
  const emailValue = useSelector((state) => state.survey.emailValue);
  const router = useRouter();

  useEffect(() => {
    if (emailValue) {
      fetch("/api/getForms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailValue }),
      })
        .then((res) => res.json())
        .then((data) => setForms(data.forms || []))
        .catch((err) => console.error(err));
    }
  }, [emailValue]);

  const handleFormClick = (fileName) => {
    router.push(`/formMaker?form=${fileName}`);
  };

  return (
    <SiteTemplate>
      <main className="min-h-[calc(100vh-152px)] p-6">
        <h1 className="text-3xl font-bold mb-6">Your Existing Forms</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forms.map((form) => (
            <div
              key={form.fileName}
              className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg"
              onClick={() => handleFormClick(form.fileName)}
            >
              <h2 className="text-xl font-semibold">{form.surveyTitle}</h2>
              <p className="text-gray-600">Click to edit</p>
            </div>
          ))}
        </div>
        {forms.length === 0 && <p>No existing forms found.</p>}
      </main>
    </SiteTemplate>
  );
}
