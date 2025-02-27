import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { NavItem } from '../../types';

const navItems: NavItem[] = [
  { title: 'Home', path: 'home' },
  { title: 'About', path: 'about' },
  { title: 'Projects', path: 'projects' },
  { title: 'Contact', path: 'contact' }
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [navbarHeight, setNavbarHeight] = useState<number>(0);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateNavbarHeight = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };

    // Initial height calculation
    updateNavbarHeight();

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Adjust calculation to account for viewport height
      const adjustedDocHeight = documentHeight - windowHeight;
      const progress = Math.min((scrollTop / adjustedDocHeight) * 100, 100);
      
      setScrollProgress(progress);
      setScrolled(scrollTop > 50);
      
      // Update navbar height when scroll state changes
      updateNavbarHeight();
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateNavbarHeight);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, []);

  const handleSetActive = (section: string) => {
    setActiveSection(section);
    
    // Force recalculation of scroll progress after section change
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const adjustedDocHeight = documentHeight - windowHeight;
    const progress = Math.min((scrollTop / adjustedDocHeight) * 100, 100);
    setScrollProgress(progress);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[101]">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav ref={navbarRef} className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        <div className={`mx-auto transition-all duration-500 ${
          scrolled ? 'w-[92%] md:w-[89%] lg:w-[80%] mt-4' : 'w-full px-6'
        }`}>
          <div className={`mx-auto rounded-2xl transition-all duration-500 ${
            scrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-lg shadow-gray-900/20 px-6' : 'bg-transparent px-3'
          }`}>
            {/* Desktop Navigation */}
            <div className="hidden md:flex justify-between items-center h-16">
              {/* Logo */}
              <Link 
                to="home"
                smooth={true}
                duration={500}
                offset={0}
                className="text-2xl font-bold relative group cursor-pointer px-3"
              >
                <span className="text-white group-hover:text-transparent transition-all duration-300 bg-clip-text group-hover:bg-gradient-to-r from-blue-400 to-purple-500">
                  RF
                </span>
              </Link>

              {/* Navigation Items */}
              <div className="flex items-center space-x-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    spy={true}
                    smooth={true}
                    offset={item.path === 'home' ? 0 : navbarHeight}
                    duration={500}
                    onSetActive={handleSetActive}
                    className={`
                      relative px-5 py-2 cursor-pointer
                      ${activeSection === item.path 
                        ? 'text-white bg-white/10 rounded-lg' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-300'
                      }
                    `}
                  >
                    <span className="relative z-10 text-sm">
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex justify-between items-center h-16">
              <Link 
                to="home"
                smooth={true}
                duration={500}
                offset={0}
                className="text-2xl font-bold text-white cursor-pointer"
              >
                RF
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-10 h-10 text-white focus:outline-none cursor-pointer"
              >
                <div className="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                  <span className={`absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                    isOpen ? 'rotate-45 delay-200' : '-translate-y-2'
                  }`} />
                  <span className={`absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`} />
                  <span className={`absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                    isOpen ? '-rotate-45 delay-200' : 'translate-y-2'
                  }`} />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="bg-gray-900/90 backdrop-blur-md shadow-lg">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  spy={true}
                  smooth={true}
                  offset={item.path === 'home' ? 0 : -navbarHeight}
                  duration={500}
                  activeClass="active"
                  className={`block px-6 py-3 text-sm transition-all duration-300 cursor-pointer ${
                    activeSection === item.path 
                      ? 'text-white bg-white/10' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => {
                    setIsOpen(false);
                    handleSetActive(item.path);
                  }}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;