import '../../../styles.css';
import GetStartedButton from './components/client/getStartedButton';

export default function Home() {
  return (
    <main className="bg-white font-sans text-neutral min-h-screen flex flex-col">
      {/* Header */}
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
      {/* Hero Section */}
      <section className="bg-lightblue py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
          {/* Left content */}
          <div>
            <h1 className="text-4xl font-bold mb-4">
              AI-powered surveys that engage your audience.
              <br />
              Insights that drive growth.
            </h1>
            <p className="text-lg mb-6">
              Create beautiful, engaging surveys and forms that inspire powerful feedback and inform smarter business decisions.
            </p>
            <GetStartedButton />
          </div>
          {/* Right image */}
          <div>
            <img
              src="/hero-graphic.png"
              alt="Survey dashboard preview"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Expert Section (dark background) */}
      <section className="bg-darkblue text-white text-center py-20">
        <h2 className="text-3xl font-bold max-w-3xl mx-auto">
          Your always-on expert to help you make confident business decisions
        </h2>
      </section>

      {/* AI Build Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
          {/* Left image */}
          <div>
            <img
              src="/ai-builder.png"
              alt="AI build survey preview"
              className="rounded-lg shadow-md"
            />
          </div>
          {/* Right content */}
          <div>
            <h3 className="uppercase text-sm text-darkblue font-bold mb-2">
              Build like a pro
            </h3>
            <h2 className="text-3xl font-bold mb-4">
              Create expert surveys and forms in seconds
            </h2>
            <p className="mb-6">
              Just write a prompt for an AI-polished survey or form—or get a head start with 500+ expert templates.
            </p>
            <button className="bg-darkblue px-6 py-3 rounded-md hover:bg-lightblue font-semibold text-white">
              Get started free
            </button>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
          {/* Left graphic */}
          <div>
            <img
              src="/customer-feedback.png"
              alt="Customer feedback survey preview"
              className="rounded-lg shadow-md"
            />
          </div>
          {/* Right content */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Improve customer satisfaction and loyalty
            </h2>
            <p className="mb-6">
              Capture feedback across the customer journey to identify pain points, track satisfaction, and build brand loyalty.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-darkblue">
              <li><a href="#">NPS survey template</a></li>
              <li><a href="#">Customer satisfaction survey template</a></li>
              <li><a href="#">Customer service feedback survey template</a></li>
            </ul>
            <button className="mt-6 border border-darkblue px-6 py-3 rounded-md hover:bg-lightblue font-semibold">
              See more templates
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-darkblue text-white p-6 text-center">
        <p>&copy; 2025 My Survey App. All rights reserved.</p>
      </footer>
    </main>
  );
}