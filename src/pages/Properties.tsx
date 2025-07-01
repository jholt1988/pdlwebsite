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
    },
    {
      id: 5,
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: '1807 West Maple',
      location: 'West Wichita',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1100,
      rent: 875,
      deposit: 875,
      available: '2024-02-15',
      features: ['Spacious Layout', 'Updated Kitchen', 'Fenced Yard', 'Garage', 'Near Parks', 'Quiet Neighborhood'],
      description: 'Beautiful home on West Maple with spacious rooms and modern updates. Features a large fenced yard and garage in a quiet residential neighborhood.',
      amenities: ['Spacious Layout', 'Updated Kitchen', 'Fenced Yard', 'Garage']
    },
    {
      id: 6,
      image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: '2946 Bunkerhill',
      location: 'Northeast Wichita',
      bedrooms: 2,
      bathrooms: 1,
      sqft: 850,
      rent: 725,
      deposit: 725,
      available: '2024-02-20',
      features: ['Cozy Home', 'Updated Flooring', 'Large Backyard', 'Storage Shed', 'Pet-Friendly', 'Near Shopping'],
      description: 'Charming home on Bunkerhill with updated flooring and a large backyard. Perfect for small families or professionals seeking a comfortable living space.',
      amenities: ['Cozy Home', 'Updated Flooring', 'Large Backyard', 'Pet-Friendly']
    },
    {
      id: 7,
      image: 'https://images.pexels.com/photos/1396125/pexels-photo-1396125.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: '2948 Bunkerhill',
      location: 'Northeast Wichita',
      bedrooms: 2,
      bathrooms: 1,
      sqft: 875,
      rent: 750,
      deposit: 750,
      available: '2024-02-22',
      features: ['Recently Updated', 'Modern Appliances', 'Covered Porch', 'Off-street Parking', 'Near Schools', 'Quiet Street'],
      description: 'Recently updated home on Bunkerhill featuring modern appliances and a covered front porch. Located on a quiet street with convenient access to schools.',
      amenities: ['Recently Updated', 'Modern Appliances', 'Covered Porch', 'Near Schools']
    },
    {
      id: 8,
      image: 'https://images.pexels.com/photos/1396119/pexels-photo-1396119.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: '525 E Lincoln',
      location: 'Central Wichita',
      bedrooms: 2,
      bathrooms: 1,
      sqft: 800,
      rent: 650,
      deposit: 650,
      available: '2024-02-25',
      features: ['Central Location', 'Hardwood Floors', 'Updated Bathroom', 'Walk-in Closet', 'Near Downtown', 'Transit Access'],
      description: 'Centrally located home on East Lincoln with beautiful hardwood floors and updated bathroom. Easy access to downtown and public transportation.',
      amenities: ['Central Location', 'Hardwood Floors', 'Updated Bathroom', 'Transit Access']
    },
    {
      id: 9,
      image: 'https://images.pexels.com/photos/1396117/pexels-photo-1396117.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: '1204 S. Emporia',
      location: 'South Wichita',
      bedrooms: 3,
      bathrooms: 1,
      sqft: 950,
      rent: 800,
      deposit: 800,
      available: '2024-03-01',
      features: ['Three Bedrooms', 'Large Living Room', 'Dining Area', 'Basement Storage', 'Corner Lot', 'Mature Trees'],
      description: 'Spacious three-bedroom home on South Emporia with large living areas and basement storage. Located on a corner lot with mature trees.',
      amenities: ['Three Bedrooms', 'Large Living Room', 'Basement Storage', 'Corner Lot']
    },
    {
      id: 10,
      image: 'https://images.pexels.com/photos/1396127/pexels-photo-1396127.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: '1952 Jackson',
      location: 'Riverside',
      bedrooms: 2,
      bathrooms: 1,
      sqft: 775,
      rent: 675,
      deposit: 675,
      available: '2024-03-05',
      features: ['Riverside Location', 'Updated Kitchen', 'Tile Flooring', 'Patio Area', 'Near River', 'Peaceful Setting'],
      description: 'Cozy home on Jackson in the Riverside area with updated kitchen and tile flooring. Features a patio area in a peaceful setting near the river.',
      amenities: ['Riverside Location', 'Updated Kitchen', 'Patio Area', 'Peaceful Setting']
    },
    {
      id: 11,
      image: 'https://images.pexels.com/photos/1396130/pexels-photo-1396130.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: '1954 Jackson',
      location: 'Riverside',
      bedrooms: 2,
      bathrooms: 1,
      sqft: 800,
      rent: 700,
      deposit: 700,
      available: '2024-03-08',
      features: ['Riverside Living', 'Renovated Interior', 'New Carpet', 'Window AC Units', 'Garden Space', 'Quiet Area'],
      description: 'Recently renovated home on Jackson with new carpet and updated interior. Features garden space in a quiet riverside neighborhood.',
      amenities: ['Riverside Living', 'Renovated Interior', 'Garden Space', 'Quiet Area']
    },
    {
      id: 12,
      image: 'https://images.pexels.com/photos/1396134/pexels-photo-1396134.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: '2053 N Market',
      location: 'North Wichita',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1150,
      rent: 925,
      deposit: 925,
      available: '2024-03-10',
      features: ['North Side Location', 'Two Full Baths', 'Master Bedroom', 'Attached Garage', 'Large Lot', 'Near Shopping'],
      description: 'Spacious home on North Market with two full bathrooms and attached garage. Located on a large lot with convenient access to shopping.',
      amenities: ['Two Full Baths', 'Master Bedroom', 'Attached Garage', 'Large Lot']
    },
    {
      id: 13,
      image: 'https://images.pexels.com/photos/1396123/pexels-photo-1396123.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: '2042 S. Topeka',
      location: 'South Wichita',
      bedrooms: 2,
      bathrooms: 1,
      sqft: 825,
      rent: 725,
      deposit: 725,
      available: '2024-03-12',
      features: ['South Side Living', 'Open Floor Plan', 'Updated Fixtures', 'Covered Parking', 'Fenced Yard', 'Near Parks'],
      description: 'Well-maintained home on South Topeka with open floor plan and updated fixtures. Features covered parking and fenced yard near parks.',
      amenities: ['Open Floor Plan', 'Updated Fixtures', 'Covered Parking', 'Fenced Yard']
    },
    {
      id: 14,
      image: 'https://images.pexels.com/photos/1396128/pexels-photo-1396128.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: '2044 S. Topeka',
      location: 'South Wichita',
      bedrooms: 2,
      bathrooms: 1,
      sqft: 850,
      rent: 750,
      deposit: 750,
      available: '2024-03-15',
      features: ['Duplex Style', 'Private Entrance', 'Updated Kitchen', 'Laundry Hookups', 'Storage Space', 'Parking Available'],
      description: 'Duplex-style home on South Topeka with private entrance and updated kitchen. Includes laundry hookups and ample storage space.',
      amenities: ['Private Entrance', 'Updated Kitchen', 'Laundry Hookups', 'Storage Space']
    },
    {
      id: 15,
      image: 'https://images.pexels.com/photos/1396121/pexels-photo-1396121.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: '1419 S. Market',
      location: 'South Wichita',
      bedrooms: 3,
      bathrooms: 1,
      sqft: 975,
      rent: 825,
      deposit: 825,
      available: '2024-03-18',
      features: ['Three Bedrooms', 'Corner Property', 'Large Kitchen', 'Dining Room', 'Basement', 'Established Neighborhood'],
      description: 'Spacious three-bedroom home on South Market with large kitchen and dining room. Corner property with basement in established neighborhood.',
      amenities: ['Three Bedrooms', 'Large Kitchen', 'Dining Room', 'Basement']
    },
    {
      id: 16,
      image: 'https://images.pexels.com/photos/1396126/pexels-photo-1396126.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: '231 E 12th',
      location: 'Augusta, KS',
      bedrooms: 2,
      bathrooms: 1,
      sqft: 750,
      rent: 625,
      deposit: 625,
      available: '2024-03-20',
      features: ['Augusta Location', 'Small Town Living', 'Updated Interior', 'Front Porch', 'Near Schools', 'Community Feel'],
      description: 'Charming home in Augusta with updated interior and front porch. Perfect for those seeking small town living with community feel.',
      amenities: ['Small Town Living', 'Updated Interior', 'Front Porch', 'Community Feel']
    }
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'Recently Renovated':
      case 'Updated Kitchens':
      case 'Updated Interiors':
      case 'Recently Updated':
      case 'Renovated Interior':
      case 'Updated Kitchen':
      case 'Updated Bathroom':
      case 'Updated Fixtures':
        return <CheckCircle className="h-4 w-4" />;
      case 'Safe Neighborhood':
      case 'Quiet Area':
      case 'Peaceful Setting':
        return <Shield className="h-4 w-4" />;
      case 'Community Support':
      case 'Community Programs':
      case 'Family-Friendly':
      case 'Community Feel':
        return <Users className="h-4 w-4" />;
      case 'Design District Location':
      case 'Central Location':
      case 'Riverside Location':
      case 'Small Town Living':
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Available Homes in Wichita & Augusta</h1>
          <p className="text-lg text-gray-600">
            Discover quality, affordable homes in established neighborhoods throughout Wichita and Augusta. 
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                placeholder="Wichita, Augusta..."
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
          <p className="text-gray-600">{properties.length} quality homes available across Wichita and Augusta</p>
        </div>

        {/* Properties Grid/List */}
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
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