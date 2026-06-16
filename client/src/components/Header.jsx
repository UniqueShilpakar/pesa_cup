import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import '../css/Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <Link to="/" className="logo">
            <img src={'src/assets/pesalogo.png'} alt="Futsal Tournament Banner" className="pesa-logo" />
            <img src={'src/assets/prabhat.png'} alt="Futsal Tournament Banner" className="prabhat-logo" />

          </Link>

          <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link">HOME</Link>
            <a href="#fixtures" className="nav-link">FIXTURES</a>
            <Link to="/standings" className="nav-link">STANDINGS</Link>
            <a href="#stats" className="nav-link">STATS</a>
            <a href="#gallery" className="nav-link">GALLERY</a>
            <Link to="/gallery" className="nav-link">GALLERY</Link>
            <a href="#sponsors" className="nav-link">SPONSORS</a>
            <Link to="/contact" className="nav-link">CONTACT</Link>
          </nav>

          <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
