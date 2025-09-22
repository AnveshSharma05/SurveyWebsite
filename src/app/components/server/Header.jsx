import Link from 'next/link';

function Header() {
  return (
      <header className="bg-darkblue text-white p-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold">My Survey App</h1>
          <nav className="space-x-6">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">Surveys</a>
            <a href="#" className="hover:underline">Results</a>
          </nav>
        </div>
      </header>
  );
}

export default Header;