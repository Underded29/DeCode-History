import React from 'react';
import AboutMission from './components/AboutMission';
import AboutHero from './components/AboutHero';
import AboutTeam from './components/AboutTeam';
import AboutDetails from './components/AboutDetails';
import Support from '../../components/Support';
import CTA from '../../components/CTA';


const About = () => {
  return (
    <>
        <AboutHero />
        <CTA />
        <AboutMission />
        <AboutDetails />
        <AboutTeam />
        <Support />
    </> 
  );
};

export default About;