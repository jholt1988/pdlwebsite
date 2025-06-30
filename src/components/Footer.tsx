import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white p-2 rounded-lg">
                <Building2 className="h-8 w-8 text-primary-800" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">PDL Rentals</h3>
                <p className="text-primary-200">Quality Affordable Housing Communities</p>
              </div>
            </div>
            <p className="text-primary-100 mb-6 max-w-md">
              For over 15 years, PDL Rentals has been dedicated to creating quality affordable housing 
              communities that provide dignity, opportunity, and hope for working families and individuals. 
              We believe everyone deserves a safe, comfortable place to call home.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-primary-200 hover:text-white transition-colors">
                  Available Communities
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/application" className="text-primary-200 hover:text-white transition-colors">
                  Apply Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary-300" />
                <span className="text-primary-100">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary-300" />
                <span className="text-primary-100">(555) 123-HELP</span>
              </div>
              <div className="text-xs text-primary-200 ml-6">24/7 Emergency Maintenance</div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-300" />
                <span className="text-primary-100">info@pdlrentals.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary-300 mt-1" />
                <span className="text-primary-100">
                  123 Main Street<br />
                  Suite 100<br />
                  Your City, ST 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-8 pt-8 text-center">
          <p className="text-primary-200">
            © 2024 PDL Rentals. All rights reserved. | Privacy Policy | Terms of Service | Equal Housing Opportunity
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;