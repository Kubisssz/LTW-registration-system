import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/Logo-ILSAS.png" 
                alt="ILSAS Logo" 
                className="h-8 w-auto"
              />
              <div>
                <span className="text-xl font-bold">Learn To Work</span>
                <span className="text-sm text-cyan-400 block leading-none">2025</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              TVET 2.0 Program designed to train non-graduates to be skilled workforce contributing towards Malaysia's Energy Transition.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Program
                </Link>
              </li>
              <li>
                <Link to="/program" className="text-gray-300 hover:text-white transition-colors">
                  Program Details
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white transition-colors">
                  Registration
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Program Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Program Info</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Age: 18-25 years old</li>
              <li>• Target: School leavers</li>
              <li>• Duration: Full-time training</li>
              <li>• Outcome: Secured employment</li>
              <li>• Industrial training included</li>
              <li>• Energy transition focus</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-cyan-400" />
                <span className="text-gray-300 text-sm">info@learntowork2025.my</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-cyan-400" />
                <span className="text-gray-300 text-sm">+60 3-2345 6789</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-cyan-400 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  TNB Headquarters<br />
                  Kuala Lumpur, Malaysia
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Learn To Work Program. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;