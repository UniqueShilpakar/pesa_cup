import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import Home from './pages/Home';
import Fixtures from './components/Fixtures';
import StandingsSection from './components/Standings';
import Gallery from './components/Gallery';
import GalleryPages from './pages/GalleryPages';
import Contact from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fixtures" element={<Fixtures />} />
        <Route path="/standings" element={<StandingsSection />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:categoryId" element={<GalleryPages />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}