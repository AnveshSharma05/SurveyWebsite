"use client";

import { useSelector} from "react-redux";

function Header() {
  
//define redux email variable to update header component with email name once user inputs their email
  const emailValue = useSelector((state) => state.survey.emailValue);

  return (
      <header className="bg-darkblue text-white p-6 shadow-md" >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold">My Survey App</h1>
          <nav className="space-x-6">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">Surveys</a>
            <a href="#" className="hover:underline">Results</a>
            {{emailValue} && (<a href="#" className="hover:underline">{emailValue}</a>)}
          </nav>
        </div>
      </header>
  );
}

export default Header;