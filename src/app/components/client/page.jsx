// pages/_app.js
import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';

function App() {
  return (
    <div>
      <Head>
        <title>Survey App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}

export default App;