// src/pages/Home/Home.jsx
import React from 'react';
import HomeHero from './components/HomeHero';
import HomeFeatures from './components/HomeFeatures';
import HomeHowItWorks from './components/HomeHowItWorks';
import HomePopularMyths from './components/HomePopularMyths';
import WhyItMatters from '../../components/WhyItMatters';
import NewsletterBanner from '../../components/NewsletterBanner';
import SchoolBanner from '../../components/SchoolBanner';

const Home = () => {
  return (
    <>
      <HomeHero />
      <HomeFeatures />
      <HomeHowItWorks />
      <HomePopularMyths />
      <SchoolBanner />
      <WhyItMatters />
      <NewsletterBanner />
    </> 
  );
};

export default Home;