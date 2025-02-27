import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Link } from 'react-scroll';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      canvas: canvasRef.current,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create world circle
    const worldGeometry = new THREE.CircleGeometry(2.5, 64);
    const worldMaterial = new THREE.LineBasicMaterial({ 
      color: 0x4299e1,
      transparent: true,
      opacity: 0.2,
    });
    const world = new THREE.LineLoop(worldGeometry, worldMaterial);

    // Create simplified continent shapes
    const createContinents = () => {
      const continents = new THREE.Group();
      
      // Create several abstract shapes representing continents
      const continentShapes = [
        // North America
        new THREE.Shape()
          .moveTo(-1.7, 1.0)
          .lineTo(-1.2, 1.3)
          .lineTo(-0.8, 1.5)
          .lineTo(-0.3, 1.2)
          .lineTo(-0.1, 0.8)
          .lineTo(0.2, 0.5)
          .lineTo(0.5, 0.3)
          .lineTo(0.9, 0.1)
          .lineTo(1.2, -0.2)
          .lineTo(1.4, -0.5)
          .lineTo(1.5, -0.8)
          .lineTo(1.2, -1.0)
          .lineTo(0.8, -1.2)
          .lineTo(0.3, -1.0)
          .lineTo(-0.2, -0.8)
          .lineTo(-0.5, -0.5)
          .lineTo(-0.8, -0.3)
          .lineTo(-1.2, -0.1),
        
        // South America
        new THREE.Shape()
          .moveTo(-0.8, -0.2)
          .bezierCurveTo(-0.6, 0.1, -0.4, 0.3, -0.2, 0.1)
          .bezierCurveTo(-0.1, -0.2, -0.2, -0.6, -0.4, -0.8)
          .bezierCurveTo(-0.6, -0.9, -0.8, -0.5, -0.8, -0.2),
        
        // Europe
        new THREE.Shape()
          .moveTo(0.2, 0.8)
          .bezierCurveTo(0.4, 1.0, 0.7, 1.1, 0.9, 0.9)
          .bezierCurveTo(1.1, 0.7, 1.0, 0.5, 0.8, 0.4)
          .bezierCurveTo(0.5, 0.3, 0.2, 0.5, 0.2, 0.8),
        
        // Africa
        new THREE.Shape()
          .moveTo(0.3, 0.2)
          .bezierCurveTo(0.5, 0.4, 0.8, 0.3, 1.0, 0.1)
          .bezierCurveTo(1.2, -0.2, 1.1, -0.5, 0.8, -0.7)
          .bezierCurveTo(0.5, -0.8, 0.2, -0.6, 0.3, -0.2)
          .bezierCurveTo(0.2, 0, 0.2, 0.1, 0.3, 0.2),
        
        // Asia
        new THREE.Shape()
          .moveTo(1.0, 0.8)
          .bezierCurveTo(1.3, 1.0, 1.6, 0.9, 1.8, 0.6)
          .bezierCurveTo(2.0, 0.3, 1.9, 0, 1.6, -0.2)
          .bezierCurveTo(1.3, -0.3, 1.0, 0, 1.0, 0.3)
          .bezierCurveTo(0.9, 0.5, 0.9, 0.7, 1.0, 0.8),
      ];

      continentShapes.forEach(shape => {
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({
          color: 0x60a5fa,
          transparent: true,
          opacity: 0.2,
        });
        const continent = new THREE.Mesh(geometry, material);
        continents.add(continent);
      });

      return continents;
    };

    const continents = createContinents();
    scene.add(world);
    scene.add(continents);

    // Position camera
    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate world and continents
      const rotationAngle = Date.now() * 0.0001;
      world.rotation.z = rotationAngle;
      continents.rotation.z = rotationAngle;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-40"
      />

      {/* Content */}
      <div className="z-10 text-center px-6 max-w-4xl mx-auto py-20">
        <div className="mb-6 inline-block">
          <span className="px-4 py-1 bg-blue-500 bg-opacity-20 rounded-full text-blue-300 text-sm">
            Ph.D. in Computer Vision
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
          Welcome to My World of Computer Vision
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300">
          I'm <span className="font-semibold text-white">Rauf Fatali</span>, building 
          AI-driven solutions to solve real-world problems through computer vision and deep learning.
        </p>
        <div className="space-x-4">
          <Link
            to="projects"
            spy={true}
            smooth={true}
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-blue-700 transition transform hover:scale-105 cursor-pointer"
          >
            Explore My Work
          </Link>
          <Link
            to="contact"
            spy={true}
            smooth={true}
            className="inline-block px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition border border-gray-700 transform hover:scale-105 cursor-pointer"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
