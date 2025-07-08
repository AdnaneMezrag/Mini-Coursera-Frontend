import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-gray-700 font-sans">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between">
          {/* Coursera Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-8 px-2">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Mini Coursera</h2>
            <div className="mb-4">
              <h3 className="text-md font-medium mb-2 text-gray-600">About</h3>
              <ul className="space-y-2">
                <li className="text-sm hover:text-blue-600 cursor-pointer">What We Offer</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">Leadership</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">Careers</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">Catalog</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">Mini Coursera Plus</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">Professional Certificates</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">MasterTrack® Certificates</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">Degrees</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">For Enterprise</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">For Government</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">For Campus</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">Become a Partner</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">Social Impact</li>
              </ul>
            </div>
          </div>

          {/* Community Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-8 px-2">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Community</h2>
            <div className="mb-4">
              <h3 className="text-md font-medium mb-2 text-gray-600">Learners</h3>
              <ul className="space-y-2">
                <li className="text-sm hover:text-blue-600 cursor-pointer">Partners</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">Beta Testers</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">Blog</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">The Mini Coursera Podcast</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">Tech Blog</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">Teaching Center</li>
              </ul>
            </div>
          </div>

          {/* More Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-8 px-2">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">More</h2>
            <div className="mb-4">
              <h3 className="text-md font-medium mb-2 text-gray-600">Press</h3>
              <ul className="space-y-2">
                <li className="text-sm hover:text-blue-600 cursor-pointer">Investors</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">Terms</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">Privacy</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">Help</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">Accessibility</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">Contact</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">Articles</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">Directory</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">Affiliates</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">Modern Slavery Statement</li>
                <li className="text-sm hover:text-blue-600 cursor-pointer">Manage Cookie Preferences</li>
              </ul>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-8 px-2">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Contact Us</h2>
            <ul className="space-y-2">
              <li><a href="mailto:mezragadnane@gmail.com" className="text-sm hover:text-blue-600 cursor-pointer">mezragadnane@gmail.com</a></li>
              <li className="text-sm hover:text-blue-600 cursor-pointer"><a href="https://www.linkedin.com/in/adnane-mezrag-525637248/">https://www.linkedin.com/in/adnane-mezrag-525637248</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-6 mt-6 text-center text-sm text-gray-500">
          © 2025 Mini Coursera Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
