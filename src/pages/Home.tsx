import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, BedSingle, Bath, Square, Star, ArrowRight, Shield, Users, Award, TrendingUp, Leaf, Heart, Home as HomeIcon, ExternalLink } from 'lucide-react';
import WelcomeVideoOverlay from '../components/WelcomeVideoOverlay';

const Home = () => {
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
  });

  const [showWelcomeVideo, setShowWelcomeVideo] = useState(true);

  const featuredProperties = [
    {
      id: 1,
      image: '/assets/Volusia.jpg',
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
      image: '/assets/Ida.jpg',
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
      image: '/assets/Hydraulic1.webp',
      title: 'The Sharon in The Douglas Design District',
      location: 'Hydraulic Avenue, Central Wichita',
      bedrooms: 1,
      bathrooms: 1,
      sqft: 650,
      rent: 550,
      available: '2024-01-20',
      features: ['Design District Location', 'Transit Access', 'Community Support', 'Safe Neighborhood'],
      isSpecial: true
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: '1807 West Maple',
      location: 'West Wichita',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1100,
      rent: 875,
      available: '2024-02-15',
      features: ['Spacious Layout', 'Updated Kitchen', 'Fenced Yard', 'Garage']
    },
    {
      id: 5,
      image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Bunkerhill Residences',
      location: 'Northeast Wichita',
      bedrooms: 2,
      bathrooms: 1,
      sqft: 850,
      rent: 725,
      available: '2024-02-20',
      features: ['Cozy Homes', 'Updated Flooring', 'Large Backyards', 'Pet-Friendly']
    },
    {
      id: 6,
      image: 'https://images.pexels.com/photos/1396126/pexels-photo-1396126.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: '231 E 12th Augusta',
      location: 'Augusta, KS',
      bedrooms: 2,
      bathrooms: 1,
      sqft: 750,
      rent: 625,
      available: '2024-03-20',
      features: ['Small Town Living', 'Updated Interior', 'Front Porch', 'Community Feel']
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
    { icon: TrendingUp, label: 'Years Serving Communities', value: '11+' },
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
      {/* Welcome Video Overlay */}
      {showWelcomeVideo && (
        <WelcomeVideoOverlay
          videoSrc="/public/videos/20250702_0556_Sunset Family Connection_remix_01jz5cfr5eft19x4m46f00jkjc.mp4"
          posterSrc="/assets/Hydraulic2.webp"
          captionsSrc="/captions/welcome-video-en.vtt"
          videoTitle="Welcome to PDL Rentals"
          videoDescription="Discover quality affordable housing communities in Wichita and Augusta, Kansas. Learn about our family-owned property management services and find your fresh start with PDL Rentals."
          maxWidth="85%"
          autoCloseOnEnd={true}
          showProgress={true}
          captionsEnabled={false}
          onClose={() => setShowWelcomeVideo(false)}
          onPlay={() => console.log('Welcome video started playing')}
          onEnd={() => console.log('Welcome video ended')}
        />
      )}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white overflow-hidden">
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 via-transparent to-accent-900/80"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%23ffffff fill-opacity=0.05%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-accent-500 to-secondary-500 rounded-full text-sm font-semibold mb-6 shadow-glow">
                  <span className="animate-pulse mr-2">●</span>
                  Fresh Starts Available Now
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Fresh Starts Begin
                  <span className="bg-gradient-to-r from-accent-400 via-secondary-400 to-electric-400 bg-clip-text text-transparent"> at Home</span>
                </h1>
                <p className="text-xl text-primary-100 mb-8 max-w-lg leading-relaxed">
                  Family-owned and operated in Wichita and Augusta, we provide quality affordable housing 
                  for individuals and families seeking a fresh start and a place to call home.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/properties"
                    className="group bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-700 hover:to-accent-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center shadow-accent-glow hover:shadow-glow-lg transform hover:-translate-y-1"
                  >
                    View Available Homes
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/contact"
                    className="group bg-transparent border-2 border-white/30 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
              
              {/* Hero Image */}
              <div className="animate-slide-in-right">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-500/20 to-secondary-500/20 rounded-2xl blur-xl"></div>
                  <img
                    src="/assets/Hydraulic2.webp"
                    alt="PDL Rentals community homes in Wichita"
                    className="relative rounded-2xl shadow-modern-lg"
                    width={934} height={800}
                    
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      </section>

      {/* Portal Access Section */}
      <section className="bg-gradient-to-r from-neutral-50 to-neutral-100 shadow-modern -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-modern-lg p-6 mb-8 border border-neutral-200/50">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-800 to-accent-700 bg-clip-text text-transparent mb-6 text-center">
              Welcome to The Sharon in The Douglas Design District!
            </h2>
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 mb-6 border border-primary-200/50">
              <p className="text-primary-800 text-center mb-4 font-medium">
                Located on Hydraulic Avenue, The Sharon offers modern living in Wichita's vibrant Douglas Design District.
              </p>
              <p className="text-neutral-700 text-center text-sm">
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
                  className="group bg-gradient-to-br from-neutral-50 to-neutral-100 hover:from-primary-50 hover:to-accent-50 border border-neutral-200 hover:border-primary-300 rounded-xl p-4 transition-all duration-300 hover:shadow-glow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-neutral-900 group-hover:text-primary-800 transition-colors">{portal.name}</h3>
                    <ExternalLink className="h-4 w-4 text-neutral-400 group-hover:text-accent-600 transition-colors" />
                  </div>
                  <p className="text-sm text-neutral-600 group-hover:text-neutral-700 transition-colors">{portal.description}</p>
                </a>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-neutral-600">
                Please bookmark these links for easy access. If you need assistance accessing any of these portals, 
                please contact our property management office.
              </p>
            </div>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-modern-lg p-6 border border-neutral-200/50">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-800 to-accent-700 bg-clip-text text-transparent mb-6 text-center">Find Your New Home in Wichita & Augusta</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Wichita, Augusta..."
                    className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    value={searchFilters.location}
                    onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Min Rent</label>
                <input
                  type="number"
                  placeholder="$500"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  value={searchFilters.minPrice}
                  onChange={(e) => setSearchFilters({...searchFilters, minPrice: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Max Rent</label>
                <input
                  type="number"
                  placeholder="$1,200"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  value={searchFilters.maxPrice}
                  onChange={(e) => setSearchFilters({...searchFilters, maxPrice: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Bedrooms</label>
                <select
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
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
                className="group bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 inline-flex items-center shadow-glow hover:shadow-glow-lg transform hover:-translate-y-1"
              >
                <Search className="mr-2 h-5 w-5" />
                Search Available Homes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Community Values Section */}
      <section className="bg-gradient-to-br from-neutral-50 to-neutral-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-800 to-accent-700 bg-clip-text text-transparent mb-4">Why Choose PDL Rentals</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              As a family-owned business serving Wichita and Augusta, we understand the importance of home. 
              We're committed to providing quality, affordable housing with the personal touch that only comes from local ownership.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {communityValues.map((value, index) => {
              const Icon = value.icon;
              const colors = ['from-primary-600 to-primary-700', 'from-accent-600 to-accent-700', 'from-secondary-600 to-secondary-700', 'from-electric-600 to-electric-700'];
              return (
                <div key={index} className="text-center animate-fade-in group" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className={`bg-gradient-to-br ${colors[index]} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow group-hover:shadow-glow-lg transition-all duration-300 transform group-hover:-translate-y-1`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">{value.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{value.description}</p>
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
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-800 to-accent-700 bg-clip-text text-transparent mb-4">Our Impact in Wichita & Augusta</h2>
            <p className="text-lg text-neutral-600">
              Since 2013, we've been helping individuals and families find quality, affordable homes throughout the area.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const colors = ['from-accent-600 to-accent-700', 'from-secondary-600 to-secondary-700', 'from-electric-600 to-electric-700', 'from-coral-600 to-coral-700'];
              return (
                <div key={index} className="text-center animate-fade-in group" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className={`bg-gradient-to-br ${colors[index]} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow group-hover:shadow-glow-lg transition-all duration-300 transform group-hover:-translate-y-1`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary-800 to-accent-700 bg-clip-text text-transparent mb-2">{stat.value}</div>
                  <div className="text-neutral-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-800 to-accent-700 bg-clip-text text-transparent mb-4">Available Homes</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Discover quality, affordable homes in Wichita and Augusta's established neighborhoods. 
              Each property is professionally managed and maintained to provide comfortable living.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property) => (
              <div key={property.id} className={`bg-white rounded-2xl shadow-modern overflow-hidden hover:shadow-modern-lg transition-all duration-300 transform hover:-translate-y-2 group ${property.isSpecial ? 'ring-2 ring-accent-400 shadow-accent-glow' : ''}`}>
                {property.isSpecial && (
                  <div className="bg-gradient-to-r from-accent-600 to-accent-700 text-white text-center py-2 text-sm font-semibold">
                    Featured Property
                  </div>
                )}
                <div className="relative overflow-hidden">
                  <img
                   srcSet= "384×288, 800×600, 984×738, 1152×864, 1420×1065"

                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">{property.title}</h3>
                  <div className="flex items-center text-neutral-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1 text-accent-500" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-4 text-sm text-neutral-600">
                    <div className="flex items-center">
                      <BedSingle className="h-4 w-4 mr-1 text-primary-500" />
                      <span>{property.bedrooms} bed</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1 text-secondary-500" />
                      <span>{property.bathrooms} bath</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1 text-electric-500" />
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.features.slice(0, 2).map((feature) => (
                      <span key={feature} className="bg-gradient-to-r from-primary-50 to-accent-50 text-primary-700 px-3 py-1 rounded-full text-xs border border-primary-200">
                        {feature}
                      </span>
                    ))}
                    {property.features.length > 2 && (
                      <span className="text-neutral-500 text-xs">+{property.features.length - 2} more</span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-primary-800 to-accent-700 bg-clip-text text-transparent">${property.rent.toLocaleString()}</div>
                      <div className="text-sm text-neutral-600">per month</div>
                    </div>
                    <div className="text-sm text-neutral-600">
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
              className="group bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 inline-flex items-center shadow-glow hover:shadow-glow-lg transform hover:-translate-y-1"
            >
              View All Available Homes
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Resident Stories */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-800 to-accent-700 bg-clip-text text-transparent mb-4">Resident Stories</h2>
            <p className="text-lg text-neutral-600">
              Hear from residents who have found their home and fresh start with PDL Rentals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl shadow-modern p-6 border border-neutral-200/50 hover:shadow-modern-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-gold-500 fill-current" />
                  ))}
                </div>
                <p className="text-neutral-700 mb-4 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                  <div className="text-sm text-accent-600 font-medium">{testimonial.community}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%23ffffff fill-opacity=0.05%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Fresh Start?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join our community of residents who have found quality, affordable homes in Wichita and Augusta. 
            Let our family help your family find the perfect place to call home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/application"
              className="group bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-700 hover:to-accent-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center shadow-accent-glow hover:shadow-glow-lg transform hover:-translate-y-1"
            >
              Apply Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="group bg-transparent border-2 border-white/30 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center"
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