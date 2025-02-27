import React, { useState } from 'react';
import { ContactFormData, SocialLink } from '../../types';

const socialLinks: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: 'github'
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: 'linkedin'
  },
  {
    platform: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: 'twitter'
  }
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: ContactFormData) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="min-h-screen py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Have a question or want to collaborate on AI and computer vision projects? Let's connect!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm border border-gray-700/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm border border-gray-700/50">
            <h3 className="text-xl font-bold text-white mb-6">Connect With Me</h3>
            <div className="space-y-4">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition duration-300"
                >
                  <span>{link.platform}</span>
                </a>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4">Location</h3>
              <p className="text-gray-300">
                Based in Your City, Country
                <br />
                Available for remote work worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 