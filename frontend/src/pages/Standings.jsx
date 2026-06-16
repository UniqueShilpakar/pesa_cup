//import React from 'react';
import Standings from '../components/Standings';
import './Pages.css';

export default function StandingsPage() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Tournament Standings</h1>
        <p>Check the current standings for each group</p>
      </div>
      <Standings />
    </div>
  );
}
