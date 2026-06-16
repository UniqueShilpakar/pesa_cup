
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
// import Hero from './components/Hero';
// import StandingsSection from './components/Standings';
// import ScorersPage from './pages/ScorersPage';
// import Sponsors from './components/Sponsors';
// import { Contact } from 'lucide-react';
import Home from './pages/Home';
import StandingsSection from './components/Standings';
import Fixtures from './components/Fixtures';
import Gallery from './components/Gallery';
// import Ga from './pages/GalleryPage';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="fixtures" element={<Fixtures />} />
        <Route path= "standings" element={<StandingsSection/>}/>
          <Route path="/gallery" element={<Gallery />} />
  {/* <Route path="/gallery/:categoryId" element={<GalleryPages />} /> */}
      </Routes>
    </BrowserRouter>
  );
}