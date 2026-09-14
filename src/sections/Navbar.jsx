import { useEffect, useState } from 'react';

import { navLinks } from '../constants/index.js';

const HEADER_SCROLL_THRESHOLD_PX = 8;

const NavItems = ({ onClick = () => {} }) => (
  <ul className="nav-ul">
    {navLinks.map((item) => (
      <li key={item.id} className="nav-li">
        <a href={item.href} className="nav-li_a" onClick={onClick}>
          {item.name}
        </a>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrolled = () => {
      setIsScrolled(window.scrollY > HEADER_SCROLL_THRESHOLD_PX);
    };

    updateScrolled();
    const rafId = requestAnimationFrame(updateScrolled);
    window.addEventListener('scroll', updateScrolled, { passive: true });
    window.addEventListener('hashchange', updateScrolled);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updateScrolled);
      window.removeEventListener('hashchange', updateScrolled);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const showBackdrop = isScrolled || isOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-300 ${
        showBackdrop ? 'bg-black-100/85 backdrop-blur-md border-white/10' : 'bg-transparent border-transparent'
      }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <a href="/" className="text-neutral-400 font-bold text-xl hover:text-white transition-colors">
            Hermenegildo
          </a>

          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-expanded={isOpen}
            aria-label="Toggle menu">
            <img src={isOpen ? 'assets/close.svg' : 'assets/menu.svg'} alt="toggle" className="w-6 h-6" />
          </button>

          <nav className="sm:flex hidden">
            <NavItems />
          </nav>
        </div>
      </div>

      <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <nav className="p-5">
          <NavItems onClick={closeMenu} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;