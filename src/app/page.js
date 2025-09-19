// pages/_app.js
import Head from 'next/head';
import Header from './components/server/Header';
import Hero from './components/server/Hero';
import Features from './components/server/Features';
import Footer from './components/server/Footer';

function App() {
  return (
    <div>
      <Head>
        <title>Survey App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <main className="bg-white font-sans text-neutral min-h-screen flex flex-col">
      <Header />
      <Hero />
      <Features />
      <Footer />
      </main>
    </div>
  );
}

export default App;