// components/Features.js
import './styles.css';

function Features() {
  return (
    <div>
      
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
    </div>
  );
}

export default Features;