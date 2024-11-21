import React from "react"
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import "./index.css";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      {/* Placeholder sections for smooth scrolling */}
      <section id="about" className="h-screen bg-blue-100 flex items-center justify-center">
        <h1 className="text-4xl font-bold">About Me</h1>
      </section>
      <section id="background" className="h-screen bg-green-100 flex items-center justify-center">
        <h1 className="text-4xl font-bold">Background</h1>
      </section>
      <section id="projects" className="h-screen bg-yellow-100 flex items-center justify-center">
        <h1 className="text-4xl font-bold">Projects</h1>
      </section>
      <section id="contact" className="h-screen bg-red-100 flex items-center justify-center">
        <h1 className="text-4xl font-bold">Contact</h1>
      </section>
    </div>
  );
}

export default App;
