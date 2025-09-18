import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Capacities from '@/components/Capacities';
import Services from '@/components/Services';
import Contacts from '@/components/Contacts';
import Footer from '@/components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Capacities />
        <Services />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;