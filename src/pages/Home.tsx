import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, BedSingle, Bath, Square, Star, ArrowRight, Shield, Users, Award, TrendingUp, Leaf, Heart, Home as HomeIcon, ExternalLink } from 'lucide-react';

const Home = () => {
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
  });

  const featuredProperties = [
    {
      id: 1,
      image: '/src/assets/Volusia.jpg',
      title: 'Volusia Street Community',
      location: 'South Wichita',
      bedrooms: 2,
      bathrooms: 1,
      sqft: 900,
      rent: 750,
      available: '2024-02-01',
      features: ['Recently Renovated', 'Community Garden', 'On-site Management', 'Pet-Friendly']
    },
    {
      id: 2,
      image: '/src/assets/Ida.jpg',
      title: 'Ida Avenue Homes',
      location: 'Historic District',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1200,
      rent: 950,
      available: '2024-01-15',
      features: ['Historic Charm', 'Updated Kitchens', 'Parking Available', 'Near Schools']
    },
    {
      id: 3,
      image: '/src/assets/Hydraulic1.webp',
      title: 'The Sharon in The Douglas Design District',
      location: 'Hydraulic Avenue, Central Wichita',
      bedrooms: 1,
      bathrooms: 1,
      sqft: 650,
      rent: 550,
      available: '2024-01-20',
      features: ['Design District Location', 'Transit Access', 'Community Support', 'Safe Neighborhood'],
      isSpecial: true
    }
  ];

  const communityValues = [
    { 
      icon: HomeIcon, 
      title: 'Quality Homes', 
      description: 'Well-maintained properties with modern updates and thoughtful design that create comfortable, lasting homes for families and individuals.'
    },
    { 
      icon: Shield, 
      title: 'Safe & Secure', 
      description: 'Well-lit communities with professional management, emergency response protocols, and 24/7 maintenance support for peace of mind.'
    },
    { 
      icon: Users, 
      title: 'Community Support', 
      description: 'Resident services and community programs that help families thrive, from after-school programs to job training resources.'
    },
    { 
      icon: Heart, 
      title: 'Fresh Starts', 
      description: 'We believe everyone deserves a second chance. Our communities provide stable housing for individuals and families rebuilding their lives.'
    },
  ];

  const stats = [
    { icon: TrendingUp, label: 'Years Serving Wichita', value: '11+' },
    { icon: HomeIcon, label: 'Quality Homes Provided', value: '200+' },
    { icon: Users, label: 'Residents Served', value: '500+' },
    { icon: Heart, label: 'Fresh Starts Enabled', value: '300+' },
  ];

  const testimonials = [
    {
      name: 'Maria Rodriguez',
      rating: 5,
      text: 'PDL Rentals gave my family a fresh start when we needed it most. The management team truly cares about residents, and our home on Ida Avenue has been perfect for our children.',
      community: 'Ida Avenue Homes'
    },
    {
      name: 'James Thompson',
      rating: 5,
      text: 'After some tough times, PDL helped me get back on my feet. The affordable rent and supportive community have made all the difference in rebuilding my life.',
      community: 'The Sharon in The Douglas Design District'
    },
    {
      name: 'Sarah Chen',
      rating: 5,
      text: 'The Volusia Street community has been wonderful. It\'s safe, well-maintained, and the management team is always responsive to our needs.',
      community: 'Volusia Street Community'
    },
  ];

  const portalLinks = [
    { name: 'Tenant Portal', href: 'https://pdlmanager.netlify.app/', description: 'Pay rent, submit maintenance requests, and manage your account' },
    { name: 'Admin Portal', href: 'https://pdlmanager.netlify.app/', description: 'Property management and administrative access' },
    { name: 'Property Inspection Tool', href: 'https://stunning-dodol-cab1c2.netlify.app/', description: 'Complete property inspections and reports' },
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-800 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Fresh Starts Begin
                <span className="text-accent-400"> at Home</span>
              </h1>
              <p className="text-xl text-primary-100 mb-8 max-w-lg">
                Family-owned and operated in Wichita, we provide quality affordable housing 
                for individuals and families seeking a fresh start and a place to call home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/properties"
                  className="bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
                >
                  View Available Homes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-800 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            
            {/* Hero Image - Hydraulic2 */}
            <div className="animate-slide-in-right">
              <img
                src="/src/assets/Hydraulic2.webp"
                alt="PDL Rentals community homes in Wichita"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Portal Access Section */}
      <section className="bg-white shadow-lg -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Welcome to The Sharon in The Douglas Design District!
            </h2>
            <div className="bg-primary-50 rounded-lg p-6 mb-6">
              <p className="text-primary-800 text-center mb-4">
                Located on Hydraulic Avenue, The Sharon offers modern living in Wichita's vibrant Douglas Design District.
              </p>
              <p className="text-gray-700 text-center text-sm">
                For your convenience, here are the important portal links you'll need:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {portalLinks.map((portal, index) => (
                <a
                  key={index}
                  href={portal.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-4 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{portal.name}</h3>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary-600" />
                  </div>
                  <p className="text-sm text-gray-600">{portal.description}</p>
                </a>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Please bookmark these links for easy access. If you need assistance accessing any of these portals, 
                please contact our property management office.
              </p>
            </div>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Find Your New Home in Wichita</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Neighborhood</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="South Side, Historic District..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={searchFilters.location}
                    onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Rent</label>
                <input
                  type="number"
                  placeholder="$500"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={searchFilters.minPrice}
                  onChange={(e) => setSearchFilters({...searchFilters, minPrice: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Rent</label>
                <input
                  type="number"
                  placeholder="$1,200"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={searchFilters.maxPrice}
                  onChange={(e) => setSearchFilters({...searchFilters, maxPrice: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={searchFilters.bedrooms}
                  onChange={(e) => setSearchFilters({...searchFilters, bedrooms: e.target.value})}
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                </select>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link
                to="/properties"
                className="bg-primary-800 hover:bg-primary-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
              >
                <Search className="mr-2 h-5 w-5" />
                Search Available Homes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Community Values Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose PDL Rentals</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              As a family-owned business in Wichita, we understand the importance of home. 
              We're committed to providing quality, affordable housing with the personal touch that only comes from local ownership.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {communityValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="bg-primary-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact in Wichita</h2>
            <p className="text-lg text-gray-600">
              Since 2013, we've been helping individuals and families find quality, affordable homes in Wichita's South Side.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="bg-accent-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Homes</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover quality, affordable homes in Wichita's established neighborhoods. 
              Each property is professionally managed and maintained to provide comfortable living.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property) => (
              <div key={property.id} className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${property.isSpecial ? 'ring-2 ring-accent-400' : ''}`}>
                {property.isSpecial && (
                  <div className="bg-accent-600 text-white text-center py-2 text-sm font-semibold">
                    Featured Property
                  </div>
                )}
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <BedSingle className="h-4 w-4 mr-1" />
                      <span>{property.bedrooms} bed</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{property.bathrooms} bath</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.features.slice(0, 2).map((feature) => (
                      <span key={feature} className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                    {property.features.length > 2 && (
                      <span className="text-gray-500 text-xs">+{property.features.length - 2} more</span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-primary-800">${property.rent.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">per month</div>
                    </div>
                    <div className="text-sm text-gray-600">
                      Available {new Date(property.available).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/properties"
              className="bg-primary-800 hover:bg-primary-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
            >
              View All Available Homes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Resident Stories */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Resident Stories</h2>
            <p className="text-lg text-gray-600">
              Hear from residents who have found their home and fresh start with PDL Rentals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-gold-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.community}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Fresh Start?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join our community of residents who have found quality, affordable homes in Wichita. 
            Let our family help your family find the perfect place to call home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/application"
              className="bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              Apply Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-800 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              Contact Our Family
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;