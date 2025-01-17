import React from "react"
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/About";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
    </div>
  );
}

export default App;
