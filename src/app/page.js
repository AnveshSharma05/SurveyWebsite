// pages/_app.js
import Head from 'next/head';
import Hero from './components/server/Hero';
import Features from './components/server/Features';
import SiteTemplate from './components/server/SiteTemplate';

function App() {
  return (
    <div>
      <Head>
        <title>Survey App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
     
      <SiteTemplate>
      <Hero />
      <Features />
      </SiteTemplate>

    </div>
  );
}

export default App;