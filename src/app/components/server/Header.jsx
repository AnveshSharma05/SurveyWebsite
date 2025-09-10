import Link from 'next/link';

function Header() {
  return (
    <header className="bg-primary text-white p-md shadow-card">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold">My Survey App</h1>
        <nav className="space-x-sm">
          <Link href="#">Home</Link>
          <Link href="#">Surveys</Link>
          <Link href="#">Results</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;