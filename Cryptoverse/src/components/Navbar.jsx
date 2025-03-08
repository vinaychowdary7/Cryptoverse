import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/cryptocurrency.png';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="sticky top-0 flex items-center justify-between w-full px-[5vw] py-5 h-[80px] border-b border-grey z-50 white-glassmorphism">
        <Link to="/" className="flex-none w-16 p-2">
          <img src={logo} className="w-full" />
        </Link>

        <div className="hidden sm:flex flex-row gap-10 p-2">
          <Link to='/transfer' className="p-2 text-white hover:bg-gray-300 rounded-2xl">Transfer</Link>
          <Link to='/currency' className="p-2 text-white hover:bg-gray-300 rounded-2xl">Cryptos</Link>
          <Link to='/exchanges' className="p-2 text-white hover:bg-gray-300 rounded-2xl">Exchanges</Link>
          <Link to='/news' className="p-2 text-white hover:bg-gray-300 rounded-2xl">News</Link>
          
        </div>

        <button
          className="sm:hidden text-white text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <AiOutlineClose /> : <HiMenuAlt4 />}
        </button>
        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute top-[50px] right-0 w-40 sm:hidden flex flex-col items-center gap-4 p-4 white-glassmorphism"
          >
            <Link to='/transfer' className="p-2 text-white hover:bg-gray-300 rounded-2xl" onClick={() => setMenuOpen(false)}>Transfer</Link>
            <Link to='/currency' className="p-2 text-white hover:bg-gray-300 rounded-2xl" onClick={() => setMenuOpen(false)}>Cryptos</Link>
            <Link to='/exchanges' className="p-2 text-white hover:bg-gray-300 rounded-2xl" onClick={() => setMenuOpen(false)}>Exchanges</Link>
            <Link to='/news' className="p-2 text-white hover:bg-gray-300 rounded-2xl" onClick={() => setMenuOpen(false)}>News</Link>
          </div>
        )}

      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
