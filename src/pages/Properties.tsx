import React, { useState } from 'react';
import { MapPin, BedSingle, Bath, Square, Filter, Grid, List, Leaf, Shield, Users, Heart, CheckCircle, Star } from 'lucide-react';

const Properties = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    propertyType: '',
  });

  const properties = [
    {
      id: 1,
      image: '/src/assets/Volusia.jpg',
      title: 'Volusia Street Community',
      location: 'South Wichita',
      bedrooms: 2,
      bathrooms: 1,
      sqft: 900,
      rent: 750,
      deposit: 750,
      available: '2024-02-01',
      features: ['Recently Renovated', 'Community Garden', 'On-site Management', 'Pet-Friendly', 'Parking Available', 'Near Schools'],
      description: 'Charming homes in South Wichita featuring recent renovations and updates. This community offers a peaceful setting with convenient access to local amenities and schools.',
      amenities: ['Recently Renovated', 'Community Garden', 'Pet-Friendly', 'Near Schools']
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
      deposit: 950,
      available: '2024-01-15',
      features: ['Historic Charm', 'Updated Kitchens', 'Parking Available', 'Near Schools', 'Hardwood Floors', 'Large Yards'],
      description: 'Beautiful historic homes with original character and modern updates. Located in Wichita\'s historic district with tree-lined streets and established neighborhoods.',
      amenities: ['Historic Charm', 'Updated Kitchens', 'Near Schools', 'Large Yards']
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
      deposit: 550,
      available: '2024-01-20',
      features: ['Design District Location', 'Transit Access', 'Community Support', 'Safe Neighborhood', 'On-site Laundry', 'Resident Services'],
      description: 'Modern apartments in Wichita\'s vibrant Douglas Design District. Located on Hydraulic Avenue with easy access to public transportation, local arts scene, and community resources.',
      amenities: ['Design District Location', 'Transit Access', 'Community Support', 'Safe Neighborhood'],
      isSpecial: true
    },
    {
      id: 4,
      image: '/src/assets/Hydraulic2.webp',
      title: 'Hydraulic Commons',
      location: 'Central Wichita',
      bedrooms: 2,
      bathrooms: 1,
      sqft: 850,
      rent: 675,
      deposit: 675,
      available: '2024-02-10',
      features: ['Family-Friendly', 'Updated Interiors', 'Parking', 'Community Programs', 'Playground', 'Resident Support'],
      description: 'Well-maintained family homes with updated interiors and community amenities. Perfect for families looking for affordable housing in a supportive environment.',
      amenities: ['Family-Friendly', 'Updated Interiors', 'Community Programs', 'Resident Support']
    }
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'Recently Renovated':
      case 'Updated Kitchens':
      case 'Updated Interiors':
        return <CheckCircle className="h-4 w-4" />;
      case 'Safe Neighborhood':
        return <Shield className="h-4 w-4" />;
      case 'Community Support':
      case 'Community Programs':
      case 'Family-Friendly':
        return <Users className="h-4 w-4" />;
      case 'Design District Location':
        return <Star className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const PropertyCard = ({ property }: { property: typeof properties[0] }) => (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${property.isSpecial ? 'ring-2 ring-accent-400' : ''}`}>
      {property.isSpecial && (
        <div className="bg-accent-600 text-white text-center py-2 text-sm font-semibold">
          Featured Property - The Sharon in The Douglas Design District
        </div>
      )}
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
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
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{property.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {property.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs flex items-center">
              {getAmenityIcon(amenity)}
              <span className="ml-1">{amenity}</span>
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="text-gray-500 text-xs">+{property.amenities.length - 3} more</span>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold text-primary-800">${property.rent.toLocaleString()}</div>
            <div className="text-sm text-gray-600">per month</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">Available</div>
            <div className="text-sm font-semibold text-gray-900">
              {new Date(property.available).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <button className="flex-1 bg-primary-800 hover:bg-primary-900 text-white py-2 px-4 rounded-lg font-medium transition-colors">
            Schedule Tour
          </button>
          <button className="flex-1 bg-accent-600 hover:bg-accent-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );

  const PropertyListItem = ({ property }: { property: typeof properties[0] }) => (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${property.isSpecial ? 'ring-2 ring-accent-400' : ''}`}>
      {property.isSpecial && (
        <div className="bg-accent-600 text-white text-center py-2 text-sm font-semibold">
          Featured Property - The Sharon in The Douglas Design District
        </div>
      )}
      <div className="flex flex-col md:flex-row">
        <img
          src={property.image}
          alt={property.title}
          className="w-full md:w-64 h-48 md:h-auto object-cover"
        />
        <div className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.location}</span>
              </div>
              
              <div className="flex items-center space-x-6 mb-3 text-sm text-gray-600">
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
              
              <p className="text-gray-600 text-sm mb-4">{property.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity) => (
                  <span key={amenity} className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs flex items-center">
                    {getAmenityIcon(amenity)}
                    <span className="ml-1">{amenity}</span>
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 md:ml-6 md:text-right">
              <div className="text-2xl font-bold text-primary-800 mb-1">
                ${property.rent.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                per month
              </div>
              <div className="text-sm text-gray-600 mb-4">
                Available {new Date(property.available).toLocaleDateString()}
              </div>
              
              <div className="flex flex-col space-y-2">
                <button className="bg-primary-800 hover:bg-primary-900 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Schedule Tour
                </button>
                <button className="bg-accent-600 hover:bg-accent-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Available Homes in Wichita</h1>
          <p className="text-lg text-gray-600">
            Discover quality, affordable homes in established Wichita neighborhoods. 
            Each property is professionally managed and maintained to provide comfortable, safe living.
          </p>
        </div>

        {/* Featured Property Highlight */}
        <div className="bg-gradient-to-r from-accent-600 to-accent-700 text-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Now Available: The Sharon in The Douglas Design District</h2>
              <p className="text-accent-100 mb-4">
                Experience modern living in Wichita's vibrant arts and culture district on Hydraulic Avenue.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="bg-white/20 px-3 py-1 rounded">Design District Location</span>
                <span className="bg-white/20 px-3 py-1 rounded">Transit Access</span>
                <span className="bg-white/20 px-3 py-1 rounded">Starting at $550/month</span>
              </div>
            </div>
            <div className="hidden md:block">
              <Star className="h-16 w-16 text-accent-200" />
            </div>
          </div>
        </div>

        {/* Community Features Highlight */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What Makes PDL Rentals Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-600" />
              <span className="text-sm text-gray-700">Fresh Start Opportunities</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-700">Safe, Well-Maintained Homes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <span className="text-sm text-gray-700">Family-Owned & Operated</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-700">Responsive Management</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Find Your Perfect Home
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-primary-800 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-primary-800 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Neighborhood</label>
              <input
                type="text"
                placeholder="South Side, Historic..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Rent</label>
              <input
                type="number"
                placeholder="$500"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Rent</label>
              <input
                type="number"
                placeholder="$1,200"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={filters.bedrooms}
                onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
              >
                <option value="">Any</option>
                <option value="1">1+ bed</option>
                <option value="2">2+ beds</option>
                <option value="3">3+ beds</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={filters.bathrooms}
                onChange={(e) => setFilters({...filters, bathrooms: e.target.value})}
              >
                <option value="">Any</option>
                <option value="1">1+ bath</option>
                <option value="2">2+ baths</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={filters.propertyType}
                onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
              >
                <option value="">Any type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">{properties.length} quality homes available</p>
        </div>

        {/* Properties Grid/List */}
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8"
            : "space-y-6"
        }>
          {properties.map((property) => 
            viewMode === 'grid' ? (
              <PropertyCard key={property.id} property={property} />
            ) : (
              <PropertyListItem key={property.id} property={property} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;