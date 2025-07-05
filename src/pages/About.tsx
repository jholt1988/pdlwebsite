import React from 'react';
import { Award, Shield, Users, TrendingUp, CheckCircle, Star, Heart, Home as HomeIcon, Leaf, Building2 } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'Paul LaBrue Jr.',
      title: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'With over 15 years in affordable housing development, Paul founded PDL Rentals with a mission to create quality communities that enhance residents\' lives while remaining accessible to working families. His extensive background, including over 30 years as an Insurance Adjuster helping people through vulnerable times, informs his dedicated approach to affordable housing.',
    },
    {
      name: 'Anthony Reyna',
      title: 'Founder & Chief Strategy Officer',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: "Anthony Reyna brings a unique blend of analytical prowess and innovative vision to his role as Chief Strategy Officer at PDL Rentals. With a foundation built on years as a skilled Insurance Adjuster, Anthony developed a keen ability to navigate complex situations and understand diverse needs. Beyond his professional background, Anthony is widely recognized for his exceptional intellect and broad knowledge base, often demonstrating a remarkable aptitude for complex systems and a passion for pioneering new frontiers. This combination of deep analytical thinking, a commitment to understanding human needs, and a forward-thinking, inventive spirit directly informs his strategic approach to enhancing resident experiences and driving leading-edge solutions within the residential rental property sector.",
    },
    {
      name: 'Sarah Rodriguez',
      title: 'Resident Services Manager',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Sarah leads our resident services team, connecting families with resources and ensuring every resident feels welcomed and supported in their community.',
    },
    {
      name: 'Michael Johnson',
      title: 'Facilities & Maintenance Supervisor',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Michael oversees our maintenance operations with a focus on rapid response and preventive care, ensuring residents enjoy comfortable, well-maintained homes.',
    },
  ];

  const achievements = [
    {
      icon: Award,
      title: 'Excellence in Affordable Housing',
      description: 'Recognized by the National Association of Housing and Redevelopment Officials for outstanding community development',
      year: '2023'
    },
    {
      icon: Star,
      title: 'Community Impact Award',
      description: 'Local recognition for creating positive change and strengthening neighborhoods through quality housing',
      year: '2022'
    },
    {
      icon: Shield,
      title: 'Housing Quality Standards Certification',
      description: 'All properties meet or exceed federal housing quality standards and local building codes',
      year: '2021'
    },
    {
      icon: Leaf,
      title: 'Green Building Leadership',
      description: 'Pioneer in energy-efficient affordable housing with ENERGY STAR certified properties',
      year: '2020'
    },
  ];

  const values = [
    {
      title: 'Quality First',
      description: 'We believe everyone deserves a well-built, safe, and comfortable home regardless of income level.',
    },
    {
      title: 'Community Focus',
      description: 'We create spaces that bring neighbors together and foster a sense of belonging and pride.',
    },
    {
      title: 'Resident Empowerment',
      description: 'We provide resources and support to help residents thrive and achieve their goals.',
    },
    {
      title: 'Environmental Responsibility',
      description: 'We incorporate sustainable practices that benefit both residents and the environment.',
    },
  ];

  const testimonials = [
    {
      name: 'Jennifer Walsh',
      role: 'Property Owner Partner',
      image: 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=300',
      text: 'PDL Rentals has transformed my properties into thriving communities. Their commitment to quality and resident satisfaction has exceeded all my expectations while maintaining strong returns.',
      rating: 5
    },
    {
      name: 'Robert Martinez',
      role: 'Resident, Riverside Commons',
      image: 'https://images.pexels.com/photos/2379003/pexels-photo-2379003.jpeg?auto=compress&cs=tinysrgb&w=300',
      text: 'Moving to Riverside Commons was the best decision for my family. The community is safe, well-maintained, and the management team genuinely cares about making this a great place to live.',
      rating: 5
    },
    {
      name: 'Lisa Thompson',
      role: 'Community Partner',
      image: 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=300',
      text: 'As a local school principal, I\'ve seen firsthand how PDL Rentals\' communities provide stable housing that helps children succeed. Their commitment to families is remarkable.',
      rating: 5
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Building Communities, Changing Lives</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              For over 15 years, PDL Rentals has been dedicated to creating quality affordable housing 
              communities that provide dignity, opportunity, and hope for working families and individuals.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
              
                Founded in 2013 by the visionary duo Paul LaBrue Sr. and Paul LaBrue Jr., and later joined by their steadfast friend and long-time associate Anthony Reyna, PDL stands as a testament to family legacy and unwavering dedication, delivering unparalleled housing solutions in Wichita. The very essence of the company's name, PDL, is woven from the fabric of their lives: Dixie, the beloved matriarch, Paul Senior's cherished wife and Paul Junior's devoted mother; and Pam and Lynn, Paul Senior's daughters and Paul Junior's sisters, whose spirits infuse every endeavor.</p>
<p>
Our organizational mission is to facilitate the rehabilitation of individuals' and families' lives within a secure and supportive environment, predicated on the conviction that every individual merits a renewed beginning. Our team consists of experienced property management and maintenance personnel, all committed to delivering exemplary service. We prioritize expeditious responses to our tenants' requirements, endeavoring to cultivate a positive residential experience for all inhabitants within our communities.
  </p>
<p>
We are unwavering in our commitment to being a positive force within the South Side community, forging dynamic collaborations with local organizations to uplift our residents and enrich the entire neighborhood. We believe that through unified efforts, we can cultivate an even more vibrant and thriving community for everyone.

</p>

<p>
At PDL, we extend familial regard to our residents, dedicated to furnishing a secure, comfortable, and hospitable dwelling. We comprehend the significance of identifying appropriate living accommodations, which is why we proffer a diverse selection of floor plans and amenities tailored to accommodate varying needs and fiscal parameters. We are confident that prospective residents will discover their ideal abode with us.
</p>

                
 


              <p>

                  Our success is measured not just in units managed, but in the lives we've touched: 
                  families who have found stability, children who have thrived in safe neighborhoods, 
                  and communities that have been strengthened by our presence.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern affordable housing community"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-800/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're guided by principles that ensure every resident has access to quality housing in thriving communities.
            </p>
          </div>

          <div className="bg-primary-50 rounded-2xl p-8 mb-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary-800 mb-4">Our Mission</h3>
              <p className="text-lg text-primary-700 max-w-3xl mx-auto leading-relaxed">
                To develop and manage high-quality affordable housing communities that provide safe, 
                comfortable homes while fostering resident empowerment, community connection, and 
                neighborhood revitalization. We believe that where you live should never limit your potential.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Impact */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Impact</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment extends beyond providing housing to creating positive change in the communities we serve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="bg-accent-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Housing Stability</h3>
              <p className="text-gray-600">
                Providing secure, long-term housing that allows families to build roots and children to attend the same schools.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="bg-accent-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Building</h3>
              <p className="text-gray-600">
                Creating spaces and programs that bring neighbors together, from community gardens to after-school programs.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="bg-accent-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Environmental Stewardship</h3>
              <p className="text-gray-600">
                Implementing energy-efficient features that reduce utility costs for residents while protecting the environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our dedicated professionals are committed to creating and maintaining communities 
              where residents can thrive and feel proud to call home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recognition & Achievements</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment to excellence in affordable housing has been recognized by industry leaders and community partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 hover:bg-gray-50 transition-colors shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gold-500 p-3 rounded-lg">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{achievement.title}</h3>
                        <span className="text-sm font-medium text-gold-600 bg-gold-50 px-2 py-1 rounded">
                          {achievement.year}
                        </span>
                      </div>
                      <p className="text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Voices from Our Community</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from residents, partners, and community members about the positive impact of our housing communities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-gold-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Impact by the Numbers</h2>
            <p className="text-primary-100 max-w-2xl mx-auto">
              Fifteen years of creating positive change through quality affordable housing.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent-400 mb-2">15+</div>
              <div className="text-primary-100">Years Serving Communities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-400 mb-2">500+</div>
              <div className="text-primary-100">Quality Homes Provided</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-400 mb-2">1,200+</div>
              <div className="text-primary-100">Residents Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-400 mb-2">98%</div>
              <div className="text-primary-100">Resident Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;