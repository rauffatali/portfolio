import React from 'react';
import { Skill } from '../../types';

const skills: Skill[] = [
  { name: 'Computer Vision', level: 95, category: 'other' },
  { name: 'Deep Learning', level: 90, category: 'other' },
  { name: 'TensorFlow/PyTorch', level: 88, category: 'tools' },
  { name: 'Python', level: 92, category: 'backend' },
  { name: 'React', level: 85, category: 'frontend' },
  { name: 'TypeScript', level: 82, category: 'frontend' },
];

const About: React.FC = () => {
  return (
    <section id="about" className="min-h-screen py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Bridging the gap between cutting-edge computer vision research and practical applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm border border-gray-700/50">
            <h3 className="text-2xl font-bold text-white mb-6">My Journey</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                As a Ph.D. holder in Computer Vision, I've dedicated my career to pushing the boundaries
                of artificial intelligence and visual computing. My research focuses on developing
                robust algorithms for real-world applications in computer vision and deep learning.
              </p>
              <p>
                I specialize in developing sophisticated AI solutions that bridge the gap between
                academic research and practical applications. My expertise includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Advanced object detection and tracking systems</li>
                <li>Deep learning-based image processing</li>
                <li>Real-time computer vision applications</li>
                <li>Full-stack AI solution development</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm border border-gray-700/50">
            <h3 className="text-2xl font-bold text-white mb-6">Technical Expertise</h3>
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name} className="relative">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-200 font-medium">{skill.name}</span>
                    <span className="text-blue-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500 ease-out"
                      style={{ 
                        width: `${skill.level}%`,
                        boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm border border-gray-700/50">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Research Interests</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-700/50">
              <h4 className="text-xl font-semibold text-blue-400 mb-3">Computer Vision</h4>
              <p className="text-gray-300">
                Advancing state-of-the-art in object detection, segmentation, and visual understanding
              </p>
            </div>
            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-700/50">
              <h4 className="text-xl font-semibold text-blue-400 mb-3">Deep Learning</h4>
              <p className="text-gray-300">
                Developing novel architectures for complex visual recognition tasks
              </p>
            </div>
            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-700/50">
              <h4 className="text-xl font-semibold text-blue-400 mb-3">AI Applications</h4>
              <p className="text-gray-300">
                Creating practical solutions for real-world computer vision challenges
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 