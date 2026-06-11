import { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import Home from './pages/Home.jsx';
import Admin from './pages/Admin.jsx';

export default function App() {
  const [page, setPage] = useState(
    window.location.hash === '#admin' ? 'admin' : 'home'
  );

  const [menuOpen, setMenuOpen] = useState(false);

  function goToHome(sectionId) {
    setPage('home');
    window.location.hash = '';
    setMenuOpen(false);

    setTimeout(() => {
      if (sectionId) {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  }

  function goToAdmin() {
    setPage('admin');
    window.location.hash = 'admin';
    setMenuOpen(false);
  }

  return (
    <>
      <nav className="topbar">
        <button className="brand" onClick={() => goToHome('inicio')}>
          <Heart size={18} />
          <span>Ti & Gui</span>
        </button>

        <button
          className="menuButton"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <div className={`navLinks ${menuOpen ? 'open' : ''}`}>
          <button onClick={() => goToHome('rsvp')}>
            Confirmar presença
          </button>

          <button onClick={() => goToHome('presentes')}>
            Presentes
          </button>

          <button onClick={() => goToHome('local')}>
            Local
          </button>

          <button onClick={() => goToHome('historia')}>
            Nossa história
          </button>

          <button onClick={goToAdmin}>
            Admin
          </button>
        </div>
      </nav>

      {page === 'admin' ? <Admin /> : <Home />}
    </>
  );
}