import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-scroll";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full transition-all duration-300 z-[100] ${
      scrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold"
        >
          <Link 
            to="intro"
            smooth={true}
            duration={500}
            className="cursor-pointer text-white hover:text-blue-400 transition-colors duration-300"
          >
            Rauf Fatali
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {['about', 'projects', 'blogs', 'contact'].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item}
                smooth={true}
                duration={500}
                className="cursor-pointer text-white hover:text-blue-400 transition-colors duration-300 text-lg"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Hamburger Menu */}
        <motion.div 
          className="md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            className="text-white text-xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </motion.div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-900/95 backdrop-blur-sm md:hidden"
          >
            {['about', 'projects', 'blogs', 'contact'].map((item) => (
              <Link
                key={item}
                to={item}
                smooth={true}
                duration={500}
                className="block px-6 py-3 text-white hover:text-blue-400 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;