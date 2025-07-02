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
    <header className="bg-white/95 backdrop-blur-md shadow-modern sticky top-0 z-50 border-b border-neutral-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <img 
                src="/assets/Minimalist Keyhole Logo Design.png" 
                alt="PDL Rentals Logo" 
                className="relative h-12 w-auto"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-800 to-accent-700 bg-clip-text text-transparent">PDL Rentals</h1>
              <p className="text-sm text-neutral-600">Quality Affordable Housing Communities</p>
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
                  className={`group flex items-center space-x-1 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'text-primary-800 bg-gradient-to-r from-primary-50 to-accent-50 shadow-glow'
                      : 'text-neutral-700 hover:text-primary-800 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50'
                  }`}
                >
                  <Icon className={`h-4 w-4 transition-colors ${isActive(item.href) ? 'text-primary-600' : 'text-neutral-500 group-hover:text-primary-600'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            {/* Portal Links Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 px-3 py-2 rounded-xl text-sm font-medium text-neutral-700 hover:text-primary-800 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 transition-all duration-300">
                <ExternalLink className="h-4 w-4 text-neutral-500 group-hover:text-primary-600 transition-colors" />
                <span>Portals</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-modern-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-neutral-200/50">
                <div className="py-1">
                  {portalLinks.map((portal) => {
                    const Icon = portal.icon;
                    return (
                      <a
                        key={portal.name}
                        href={portal.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-neutral-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 hover:text-primary-800 transition-all duration-300"
                      >
                        <Icon className="h-4 w-4 text-neutral-500" />
                        <span>{portal.name}</span>
                        <ExternalLink className="h-3 w-3 ml-auto text-neutral-400" />
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
              className="p-2 rounded-xl text-neutral-700 hover:text-primary-800 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-neutral-200">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive(item.href)
                        ? 'text-primary-800 bg-gradient-to-r from-primary-50 to-accent-50'
                        : 'text-neutral-700 hover:text-primary-800 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive(item.href) ? 'text-primary-600' : 'text-neutral-500'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Portal Links */}
              <div className="border-t border-neutral-200 pt-2 mt-2">
                <div className="px-3 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
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
                      className="flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium text-neutral-700 hover:text-primary-800 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 transition-all duration-300"
                    >
                      <Icon className="h-4 w-4 text-neutral-500" />
                      <span>{portal.name}</span>
                      <ExternalLink className="h-3 w-3 ml-auto text-neutral-400" />
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