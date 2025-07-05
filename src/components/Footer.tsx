import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-primary-950 to-accent-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-xl shadow-glow">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-200 bg-clip-text text-transparent">PDL Rentals</h3>
                <p className="text-neutral-300">Quality Affordable Housing Communities</p>
              </div>
            </div>
            <p className="text-neutral-200 mb-6 max-w-md leading-relaxed">
              For over 11 years, PDL Rentals has been dedicated to creating quality affordable housing 
              communities that provide dignity, opportunity, and hope for working families and individuals. 
              We believe everyone deserves a safe, comfortable place to call home.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-300 hover:text-accent-400 transition-colors p-2 rounded-lg hover:bg-white/10">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-accent-400 transition-colors p-2 rounded-lg hover:bg-white/10">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-accent-400 transition-colors p-2 rounded-lg hover:bg-white/10">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-accent-400 transition-colors p-2 rounded-lg hover:bg-white/10">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-white transition-colors hover:translate-x-1 transform duration-300 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-neutral-300 hover:text-white transition-colors hover:translate-x-1 transform duration-300 inline-block">
                  Available Communities
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-white transition-colors hover:translate-x-1 transform duration-300 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-white transition-colors hover:translate-x-1 transform duration-300 inline-block">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/application" className="text-neutral-300 hover:text-white transition-colors hover:translate-x-1 transform duration-300 inline-block">
                  Apply Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 group">
                <Phone className="h-4 w-4 text-accent-400 group-hover:text-accent-300 transition-colors" />
                <span className="text-neutral-200 group-hover:text-white transition-colors">(316) 350-4020</span>
              </div>
              <div className="flex items-center space-x-2 group">
                <Phone className="h-4 w-4 text-accent-400 group-hover:text-accent-300 transition-colors" />
                <span className="text-neutral-200 group-hover:text-white transition-colors">(555) 123-HELP</span>
              </div>
              <div className="text-xs text-neutral-400 ml-6">24/7 Emergency Maintenance</div>
              <div className="flex items-center space-x-2 group">
                <Mail className="h-4 w-4 text-accent-400 group-hover:text-accent-300 transition-colors" />
                <span className="text-neutral-200 group-hover:text-white transition-colors">info@pdlrentals.com</span>
              </div>
              <div className="flex items-start space-x-2 group">
                <MapPin className="h-4 w-4 text-accent-400 group-hover:text-accent-300 transition-colors mt-1" />
                <span className="text-neutral-200 group-hover:text-white transition-colors">
                  1531 N. Sheridan<br />
                  Wichita, KS 67213
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 text-center">
          <p className="text-neutral-400">
            © 2024 PDL Rentals. All rights reserved. | Privacy Policy | Terms of Service | Equal Housing Opportunity
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;