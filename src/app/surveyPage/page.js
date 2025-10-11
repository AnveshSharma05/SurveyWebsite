"use client";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import SiteTemplate from "@/app/components/server/SiteTemplate";

export default function SurveyPage() {
  const emailValue = useSelector((state) => state.surveyItem.emailValue);
  const router = useRouter();

  const handleCreateFromScratchClick = () => {
    // Handle create from scratch button click
    console.log("Create from scratch button clicked");
    // Redirect to the formMaker page
    if (!emailValue == "" || !emailValue == null) {
      router.push("/formMaker?email=" + emailValue);
    }
  };

  return (
    <>
      <SiteTemplate>
        <main className="min-h-[calc(100vh-152px)] flex justify-center items-center">
          <div className="text-center">
            <h1>Survey Page</h1>
            <div className="mt-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Import
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
                onClick={handleCreateFromScratchClick}
              >
                Create from scratch
              </button>
            </div>
          </div>
        </main>
      </SiteTemplate>
    </>
  );
}
