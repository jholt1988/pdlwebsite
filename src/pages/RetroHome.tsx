import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, ArrowRight, Star, Shield, Users, Award, Phone, Mail, MapPin, Building2, Heart, Home as HomeIcon } from 'lucide-react';

const RetroHome = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadeddata', () => setIsVideoLoaded(true));
      video.addEventListener('ended', () => {
        video.currentTime = 0;
        video.play();
      });
    }
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (video) {
      if (isVideoPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const features = [
    {
      icon: Shield,
      title: "Quality Craftsmanship",
      description: "Meticulously maintained properties with attention to every detail and lasting materials that stand the test of time."
    },
    {
      icon: Users,
      title: "Community Living",
      description: "Fostering genuine connections and neighborly bonds in thoughtfully designed communities across Wichita."
    },
    {
      icon: Award,
      title: "Trusted Heritage",
      description: "Over 15 years of excellence in property management, building lasting relationships with residents and families."
    },
    {
      icon: Heart,
      title: "Fresh Beginnings",
      description: "Providing opportunities for new starts and second chances in safe, welcoming communities."
    }
  ];

  const testimonials = [
    {
      name: "Margaret Thompson",
      text: "The finest rental experience I've had in decades. PDL Rentals truly understands what makes a house a home.",
      year: "Resident Since 2019",
      community: "Ida Heritage"
    },
    {
      name: "Robert Chen",
      text: "A community that feels like home from the very first day. The management team genuinely cares about residents.",
      year: "Resident Since 2021",
      community: "The Sharon"
    },
    {
      name: "Maria Rodriguez",
      text: "After some difficult times, PDL gave my family the fresh start we needed. We're grateful for their understanding and support.",
      year: "Resident Since 2020",
      community: "Volusia Commons"
    }
  ];

  const properties = [
    {
      id: 1,
      image: '/src/assets/Hydraulic1.webp',
      title: 'The Sharon',
      subtitle: 'Douglas Design District',
      description: 'A masterpiece of vintage architecture restored to modern perfection in Wichita\'s vibrant arts district.',
      price: 'From $550',
      features: ['Design District Location', 'Transit Access', 'Community Support'],
      isFeatured: true
    },
    {
      id: 2,
      image: '/src/assets/Volusia.jpg',
      title: 'Volusia Commons',
      subtitle: 'South Wichita',
      description: 'Charming homes in a peaceful neighborhood setting with modern updates and community amenities.',
      price: 'From $750',
      features: ['Recently Renovated', 'Community Garden', 'Pet-Friendly']
    },
    {
      id: 3,
      image: '/src/assets/Ida.jpg',
      title: 'Ida Heritage',
      subtitle: 'Historic District',
      description: 'Beautiful historic homes with original character and thoughtful modern improvements.',
      price: 'From $950',
      features: ['Historic Charm', 'Updated Kitchens', 'Near Schools']
    }
  ];

  return (
    <div className="retro-page">
      {/* Hero Section with Video */}
      <section className="hero-section">
        <div className="video-container">
          {/* Fallback image for video */}
          <div 
            className="hero-video"
            style={{
              backgroundImage: `url('/src/assets/Hydraulic2.webp')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'sepia(20%) contrast(1.1) brightness(0.9)'
            }}
          />
          
          {/* Video Overlay */}
          <div className="video-overlay"></div>
          
          {/* Video Controls (hidden for fallback) */}
          <button 
            className="video-control"
            onClick={toggleVideo}
            aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
            style={{ display: 'none' }}
          >
            {isVideoPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
        </div>

        {/* Hero Content */}
        <div className="hero-content">
          <div className="container">
            <div className="hero-text">
              <div className="vintage-badge">
                <span>Est. 2013</span>
              </div>
              
              <h1 className="hero-title">
                <span className="title-line-1">Distinguished</span>
                <span className="title-line-2">Living</span>
                <span className="title-line-3">Fresh Starts Begin Here</span>
              </h1>
              
              <p className="hero-subtitle">
                Timeless elegance meets modern comfort in our carefully curated 
                collection of quality affordable housing communities across Wichita.
              </p>
              
              <div className="hero-buttons">
                <Link to="/properties" className="btn btn-primary">
                  View Properties
                  <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  Schedule Tour
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">The PDL Difference</h2>
            <div className="decorative-line"></div>
            <p style={{ textAlign: 'center', fontSize: '1.1rem', color: 'var(--vintage-charcoal)', maxWidth: '600px', margin: '0 auto' }}>
              Family-owned and operated in Wichita, we believe everyone deserves a quality home and a fresh start.
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="feature-card" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className="feature-icon">
                    <Icon size={32} />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Properties Showcase */}
      <section className="properties-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Communities</h2>
            <div className="decorative-line"></div>
            <p style={{ textAlign: 'center', fontSize: '1.1rem', color: 'var(--vintage-charcoal)', maxWidth: '700px', margin: '0 auto' }}>
              Discover quality, affordable homes in established Wichita neighborhoods where families thrive and communities flourish.
            </p>
          </div>
          
          <div className="properties-grid">
            {properties.map((property, index) => (
              <div key={property.id} className={`property-card ${property.isFeatured ? 'large' : ''}`}>
                <div className="property-image">
                  <img src={property.image} alt={property.title} />
                  <div className="property-overlay">
                    {property.isFeatured && (
                      <div className="property-badge">Featured</div>
                    )}
                  </div>
                </div>
                <div className="property-content">
                  <h3 className="property-title">{property.title}</h3>
                  <p className="property-location">{property.subtitle}</p>
                  <p className="property-description">{property.description}</p>
                  
                  <div style={{ margin: '1rem 0' }}>
                    {property.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        style={{
                          display: 'inline-block',
                          background: 'var(--vintage-sepia)',
                          color: 'var(--vintage-brown)',
                          padding: '0.25rem 0.75rem',
                          margin: '0.25rem 0.25rem 0.25rem 0',
                          fontSize: '0.875rem',
                          borderRadius: '12px',
                          border: '1px solid var(--vintage-beige)'
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="property-price">{property.price}/month</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="section-footer">
            <Link to="/properties" className="btn btn-outline">
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Resident Stories</h2>
            <div className="decorative-line"></div>
            <p style={{ textAlign: 'center', fontSize: '1.1rem', color: 'var(--vintage-charcoal)', maxWidth: '600px', margin: '0 auto' }}>
              Hear from residents who have found their home and fresh start with PDL Rentals.
            </p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="testimonial-text">
                  "{testimonial.text}"
                </blockquote>
                <div className="testimonial-author">
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-year">{testimonial.year}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--vintage-brown)', fontStyle: 'italic' }}>
                    {testimonial.community}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2 className="section-title">Get in Touch</h2>
              <p className="contact-description">
                Experience the difference of quality affordable housing in Wichita. 
                Contact our family today to learn about available homes and schedule your personal tour.
              </p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <Phone size={20} />
                  <span>(555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <Phone size={20} />
                  <span>(555) 123-HELP</span>
                  <span style={{ fontSize: '0.9rem', opacity: 0.8, marginLeft: '0.5rem' }}>
                    (24/7 Emergency)
                  </span>
                </div>
                <div className="contact-item">
                  <Mail size={20} />
                  <span>info@pdlrentals.com</span>
                </div>
                <div className="contact-item">
                  <MapPin size={20} />
                  <span>123 Main Street, Wichita, KS 67202</span>
                </div>
              </div>

              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '8px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                <h3 style={{ color: 'var(--vintage-gold)', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
                  Portal Access
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <a 
                    href="https://pdlmanager.netlify.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: 'var(--vintage-ivory)', textDecoration: 'none', fontSize: '0.95rem' }}
                  >
                    → Tenant Portal
                  </a>
                  <a 
                    href="https://pdlmanager.netlify.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: 'var(--vintage-ivory)', textDecoration: 'none', fontSize: '0.95rem' }}
                  >
                    → Admin Portal
                  </a>
                  <a 
                    href="https://stunning-dodol-cab1c2.netlify.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: 'var(--vintage-ivory)', textDecoration: 'none', fontSize: '0.95rem' }}
                  >
                    → Property Inspection Tool
                  </a>
                </div>
              </div>
            </div>
            
            <div className="contact-form">
              <form className="vintage-form">
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email Address" required />
                </div>
                <div className="form-group">
                  <input type="tel" placeholder="Phone Number" />
                </div>
                <div className="form-group">
                  <select style={{ 
                    width: '100%', 
                    padding: 'var(--space-md)', 
                    background: 'rgba(255, 255, 255, 0.9)', 
                    border: '2px solid var(--vintage-beige)', 
                    fontFamily: 'var(--font-body)', 
                    fontSize: '1rem', 
                    color: 'var(--vintage-charcoal)' 
                  }}>
                    <option value="">I'm interested in...</option>
                    <option value="the-sharon">The Sharon - Douglas Design District</option>
                    <option value="volusia">Volusia Commons - South Wichita</option>
                    <option value="ida">Ida Heritage - Historic District</option>
                    <option value="general">General Information</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea placeholder="Tell us about your housing needs..." rows={4}></textarea>
                </div>
                <button type="submit" className="btn btn-primary full-width">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Return to Main Site */}
      <div style={{ 
        position: 'fixed', 
        top: '20px', 
        left: '20px', 
        zIndex: 1000,
        background: 'rgba(212, 175, 55, 0.9)',
        padding: '0.75rem 1rem',
        borderRadius: '25px',
        border: '2px solid var(--vintage-ivory)',
        backdropFilter: 'blur(10px)'
      }}>
        <Link 
          to="/" 
          style={{ 
            color: 'var(--vintage-dark-brown)', 
            textDecoration: 'none', 
            fontFamily: 'var(--font-accent)',
            fontWeight: '500',
            fontSize: '0.875rem',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Building2 size={16} />
          Return to Main Site
        </Link>
      </div>
    </div>
  );
};

export default RetroHome;