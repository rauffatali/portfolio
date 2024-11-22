import React from "react";

const Hero = () => {
  return (
    <section
      id="about"
      className="h-screen bg-gray-900 text-white flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full grid grid-cols-12 gap-4">
            {[...Array(120)].map((_, i) => (
            <div
                key={i}
                className="animate-bounce"
                style={{
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                }}
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 35 35"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 text-blue-500 hover:text-green-500 transition transform hover:scale-125"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3C7.8 3 4.193 5.205 2.25 9c1.943 3.795 5.55 6 9.75 6s7.807-2.205 9.75-6c-1.943-3.795-5.55-6-9.75-6zm0 9a3 3 0 100-6 3 3 0 000 6z"
                />
                </svg>
            </div>
            ))}
        </div>
        </div>


      {/* Foreground Content */}
      <div className="z-10 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Welcome to the My World of <span className="text-blue-400">Computer Vision</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          I’m <span className="font-semibold">Rauf Fatali</span>, a Ph.D. student in Computer Vision, building 
          AI-driven solutions to solve real-world problems.
        </p>
        <div className="space-x-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-blue-400 text-black font-bold rounded-lg hover:bg-blue-500 transition"
          >
            View My Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
