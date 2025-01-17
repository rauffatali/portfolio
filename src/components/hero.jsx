import React, { useEffect, useRef} from "react";
import * as THREE from "three";

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
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
          .moveTo(-1.7, 1.0) // Start at top-left corner of Alaska
          .lineTo(-1.2, 1.3)  // Line to northern Canada
          .lineTo(-0.8, 1.5)  // Line to Greenland
          .lineTo(-0.3, 1.2)  // Line to eastern Canada
          .lineTo(-0.1, 0.8)  // Line to northeastern United States
          .lineTo(0.2, 0.5)   // Line to southern United States (around Florida)
          .lineTo(0.5, 0.3)   // Line to northern Mexico
          .lineTo(0.9, 0.1)   // Line to western Mexico
          .lineTo(1.2, -0.2)  // Line to southern California
          .lineTo(1.4, -0.5)  // Line to Baja California
          .lineTo(1.5, -0.8)  // Line to Alaska panhandle
          .lineTo(1.2, -1.0)  // Line to western Canada
          .lineTo(0.8, -1.2)  // Line to central United States
          .lineTo(0.3, -1.0)  // Line to eastern United States
          .lineTo(-0.2, -0.8)  // Line to southern Canada
          .lineTo(-0.5, -0.5)  // Line to Great Lakes region
          .lineTo(-0.8, -0.3)  // Line to northern Canada
          .lineTo(-1.2, -0.1),  // Line to closing point near Alaska
        
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
    scene.add(continents);

    // Create eye shapes
    const createEyeShape = () => {
      const shape = new THREE.Shape();
      shape.ellipse(0, 0, 2.5, 1, 0.7, 2 * Math.PI);
      return shape;
    };

    // Create pupil
    const createPupil = () => {
      const shape = new THREE.Shape();
      shape.ellipse(0, 0, 0.5, 0.5, 0, 2 * Math.PI);
      return shape;
    };

    // Create geometries
    const eyeShape = createEyeShape();
    const eyeGeometry = new THREE.ShapeGeometry(eyeShape);
    const pupilShape = createPupil();
    const pupilGeometry = new THREE.ShapeGeometry(pupilShape);

    // Create materials
    const eyeMaterial = new THREE.LineBasicMaterial({ 
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.45,
    });
    const pupilMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.3,
    });

    // Create meshes
    const eyeOutline = new THREE.Line(eyeGeometry, eyeMaterial);
    const pupil = new THREE.Mesh(pupilGeometry, pupilMaterial);

    scene.add(world);
    scene.add(eyeOutline);
    scene.add(pupil);

    // Position camera
    camera.position.z = 5;

    // Animation variables
    let isBlinking = false;
    let isClosing = false;
    let isOpening = false;
    let blinkProgress = 0;
    const closeDuration = 25;
    const openDuration = 25;
    const holdClosedDuration = 15;
    const timeBetweenBlinks = 300;
    let frameCount = 0;
    let holdCount = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      frameCount++;

      // Subtle rotation for world and continents
      const rotationAngle = Math.sin(frameCount * 0.005) * 0.1;
      world.rotation.z = rotationAngle;
      continents.rotation.z = rotationAngle;

      // Handle blinking
      if (frameCount % timeBetweenBlinks === 0 && !isBlinking) {
        isBlinking = true;
        isClosing = true;
        blinkProgress = 0;
      }

      if (isBlinking) {
        if (isClosing) {
          blinkProgress++;
          const scale = Math.cos((blinkProgress / closeDuration) * (Math.PI / 2));
          eyeOutline.scale.y = Math.max(0.1, scale);
          pupil.scale.y = Math.max(0.1, scale);

          if (blinkProgress >= closeDuration) {
            isClosing = false;
            holdCount = 0;
          }
        } else if (holdCount < holdClosedDuration) {
          holdCount++;
        } else if (!isOpening) {
          isOpening = true;
          blinkProgress = 0;
        } else {
          blinkProgress++;
          const scale = Math.sin((blinkProgress / openDuration) * (Math.PI / 2));
          eyeOutline.scale.y = Math.max(0.1, scale);
          pupil.scale.y = Math.max(0.1, scale);

          if (blinkProgress >= openDuration) {
            isBlinking = false;
            isOpening = false;
          }
        }
      }

      // Subtle floating motion
      const floatY = Math.sin(frameCount * 0.02) * 0.1;
      world.position.y = floatY;
      continents.position.y = floatY;
      eyeOutline.position.y = floatY;
      pupil.position.y = floatY;

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
    <section
      id="intro"
      className="h-screen pt-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center relative overflow-hidden"
    >
      {/* 3D Animation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-40"
      />

      {/* Particle Effect Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full grid grid-cols-12 gap-4">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse"
              style={{
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full opacity-10"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Lines */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="w-full h-full grid grid-cols-12 grid-rows-12">
          {[...Array(144)].map((_, i) => (
            <div key={i} className="border border-blue-300"></div>
          ))}
        </div>
      </div>

      {/* Foreground Content */}
      <div className="z-10 text-center px-6 max-w-4xl mx-auto">
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
          <a
            href="#projects"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-blue-700 transition transform hover:scale-105"
          >
            Explore My Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition border border-gray-700 transform hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
