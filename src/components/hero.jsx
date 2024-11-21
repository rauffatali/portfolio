import React from "react";

const Hero = () => {
  return (
    <section
      id="about"
      className="h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center text-center px-6"
    >
      <div>
        {/* Greeting */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Hi, I’m <span className="text-yellow-400">[Rauf Fatali]</span>!
        </h1>

        {/* Short Description */}
        <p className="text-xl md:text-2xl mb-8">
          I’m a passionate <span className="font-semibold">[Ph.D. student in Computer Vision]</span>, excited to create amazing projects.
        </p>

        {/* Call-to-Action */}
        <div className="space-x-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900 transition"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
