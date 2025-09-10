// components/Features.js
function Features() {
  return (
    <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-lg p-lg">
      <div className="bg-white p-md rounded-lg shadow-card">
        <h3 className="text-xl font-semibold mb-sm">Easy to Use</h3>
        <p>Create surveys quickly with ready-to-use templates.</p>
      </div>
      <div className="bg-white p-md rounded-lg shadow-card">
        <h3 className="text-xl font-semibold mb-sm">Customizable</h3>
        <p>Personalize your surveys to match your brand and goals.</p>
      </div>
      <div className="bg-white p-md rounded-lg shadow-card">
        <h3 className="text-xl font-semibold mb-sm">Actionable Insights</h3>
        <p>Analyze responses and make data-driven decisions.</p>
      </div>
    </section>
  );
}

export default Features;