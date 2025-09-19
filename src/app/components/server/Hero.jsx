import React from 'react';
import GetStartedButton from '../client/getStartedButton';
import './styles.css';

function Hero() {
  return (
    <div>
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
      </div>
  );
}

export default Hero;