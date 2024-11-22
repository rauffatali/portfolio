import React, { useState } from "react";
import { Link } from "react-scroll";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          < Link 
            to="about"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-blue-400"
          >
            Rauf Fatali
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="about"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-blue-400"
          >
            About Me
          </Link>
          <Link
            to="background"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-blue-400"
          >
            Background
          </Link>
          <Link
            to="projects"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-blue-400"
          >
            Projects
          </Link>
          <Link
            to="contact"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-blue-400"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button
            className="text-xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="bg-white-700 md:hidden">
          <Link
            to="about"
            smooth={true}
            duration={500}
            className="block px-6 py-2 cursor-pointer hover:text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            About Me
          </Link>
          <Link
            to="background"
            smooth={true}
            duration={500}
            className="block px-6 py-2 cursor-pointer hover:text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            Background
          </Link>
          <Link
            to="projects"
            smooth={true}
            duration={500}
            className="block px-6 py-2 cursor-pointer hover:text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            Projects
          </Link>
          <Link
            to="contact"
            smooth={true}
            duration={500}
            className="block px-6 py-2 cursor-pointer hover:text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
