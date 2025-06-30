import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Phone, Building2, Users, FileText, ExternalLink } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Communities', href: '/properties', icon: Building2 },
    { name: 'About', href: '/about', icon: Users },
    { name: 'Contact', href: '/contact', icon: Phone },
    { name: 'Apply Now', href: '/application', icon: FileText },
  ];

  const portalLinks = [
    { name: 'Tenant Portal', href: 'https://pdlmanager.netlify.app/', icon: Users },
    { name: 'Admin Portal', href: 'https://pdlmanager.netlify.app/', icon: Building2 },
    { name: 'Property Inspection', href: 'https://stunning-dodol-cab1c2.netlify.app/', icon: FileText },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src="/src/assets/Minimalist Keyhole Logo Design.png" 
                alt="PDL Rentals Logo" 
                className="h-12 w-auto"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-800">PDL Rentals</h1>
              <p className="text-sm text-gray-600">Quality Affordable Housing Communities</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary-800 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-800 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            {/* Portal Links Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-800 hover:bg-gray-100 transition-colors">
                <ExternalLink className="h-4 w-4" />
                <span>Portals</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  {portalLinks.map((portal) => {
                    const Icon = portal.icon;
                    return (
                      <a
                        key={portal.name}
                        href={portal.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-800 transition-colors"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{portal.name}</span>
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-primary-800 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-primary-800 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-800 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Portal Links */}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Portal Access
                </div>
                {portalLinks.map((portal) => {
                  const Icon = portal.icon;
                  return (
                    <a
                      key={portal.name}
                      href={portal.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-800 hover:bg-gray-100 transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{portal.name}</span>
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  );
                })}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;