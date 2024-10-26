import React from 'react';
import CafeteriaCard from '../components/CafeteriaCard';
import HeroSections from '../components/HeroSections';

function Home() {


  return (
    <div>
      {/* <h1>Bienvenue chez MorningBox</h1> */}
      <HeroSections />
     
      <div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12">
        <h2 class="MenuText pm-custom-section-heading pm-AH pm-h2">Nos cafétérias</h2>
      </div>
      <CafeteriaCard />
      
    </div>
  );
}

export default Home;