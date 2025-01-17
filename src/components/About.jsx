import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const networkRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    
    // Three.js setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 15;

    // Network structure
    const createNetwork = () => {
      const network = new THREE.Group();
      const layers = [4, 8, 12, 8, 4];
      const layerSpacing = 4;
      
      // Materials
      const nodeMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        emissive: 0x00ff00,
        emissiveIntensity: 0.2,
      });
      
      const connectionMaterial = new THREE.LineBasicMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.2,
      });

      // Create layers
      layers.forEach((nodeCount, layerIndex) => {
        const layerGroup = new THREE.Group();
        layerGroup.position.x = (layerIndex - 2) * layerSpacing;
        
        // Create nodes
        for (let i = 0; i < nodeCount; i++) {
          const nodeGeometry = new THREE.SphereGeometry(0.2, 16, 16);
          const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
          node.position.y = (i - (nodeCount - 1) / 2) * 1.5;
          layerGroup.add(node);
          
          // Create connections to next layer
          if (layerIndex < layers.length - 1) {
            const nextLayerNodes = layers[layerIndex + 1];
            for (let j = 0; j < nextLayerNodes; j++) {
              const startPoint = new THREE.Vector3(
                node.position.x,
                node.position.y,
                0
              );
              const endPoint = new THREE.Vector3(
                layerSpacing,
                (j - (nextLayerNodes - 1) / 2) * 1.5,
                0
              );
              
              const connectionGeometry = new THREE.BufferGeometry().setFromPoints([
                startPoint,
                endPoint,
              ]);
              const line = new THREE.Line(connectionGeometry, connectionMaterial);
              layerGroup.add(line);
            }
          }
        }
        
        // Initial scale
        layerGroup.scale.set(0.01, 0.01, 0.01);
        network.add(layerGroup);
      });

      return network;
    };

    // Create and add network
    const network = createNetwork();
    networkRef.current = network;
    scene.add(network);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      network.rotation.y = Math.sin(Date.now() * 0.001) * 0.2;
      renderer.render(scene, camera);
    };
    animate();

    // Scroll animation
    ScrollTrigger.create({
      trigger: container,
      start: 'top center',
      end: 'bottom center',
      onUpdate: (self) => {
        const progress = self.progress;
        network.children.forEach((layer, i) => {
          const delay = i * 0.2;
          const layerProgress = Math.max(0, Math.min(1, (progress - delay) * 2));
          layer.scale.setScalar(layerProgress);
        });
      },
    });

    // Handle resize
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section id="about" className="relative min-h-screen bg-gray-900">
      {/* Background Canvas */}
      <div 
        ref={containerRef}
        className="absolute inset-0"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-white">
            About Me
          </h2>
          <div className="prose prose-lg prose-invert">
            <p className="text-gray-300">
              As a Computer Vision researcher and Ph.D. student, I'm passionate about pushing the boundaries
              of what machines can see and understand. My research focuses on developing novel deep learning
              architectures for complex visual recognition tasks.
            </p>
            <p className="text-gray-300">
              With experience in both academic research and industry applications, I specialize in:
            </p>
            <ul className="text-gray-300 list-disc list-inside mb-6">
              <li>Deep Learning for Computer Vision</li>
              <li>Real-time Object Detection and Tracking</li>
              <li>3D Scene Understanding</li>
              <li>Neural Network Architecture Design</li>
            </ul>
            <p className="text-gray-300">
              My goal is to bridge the gap between theoretical advancements and practical applications,
              creating solutions that make a real impact in fields like autonomous systems, medical imaging,
              and augmented reality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 