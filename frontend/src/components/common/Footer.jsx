import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold">MERN Auth CRUD</h3>
            <p className="text-gray-400 mt-2">Complete authentication & CRUD operations</p>
          </div>
          
          <div className="text-gray-400 text-sm">
            <p>Built with React, Node.js, Express & MongoDB</p>
            <p className="mt-1">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>This is a learning project demonstrating full-stack development with MERN stack.</p>
          <p className="mt-2">For educational purposes only.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;