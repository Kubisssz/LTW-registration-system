import React from 'react';
import { Clock, MapPin, Award, Users, BookOpen, Briefcase, CheckCircle, Calendar } from 'lucide-react';

const ProgramPage: React.FC = () => {
  const modules = [
    {
      title: 'Energy Fundamentals',
      duration: '4 weeks',
      description: 'Basic principles of energy systems, renewable energy technologies, and sustainability concepts.'
    },
    {
      title: 'Technical Skills Development',
      duration: '8 weeks',
      description: 'Hands-on training in electrical systems, maintenance procedures, and safety protocols.'
    },
    {
      title: 'Digital Literacy',
      duration: '3 weeks',
      description: 'Computer skills, digital tools, and technology applications in the energy sector.'
    },
    {
      title: 'Soft Skills & Communication',
      duration: '3 weeks',
      description: 'Professional communication, teamwork, problem-solving, and workplace etiquette.'
    },
    {
      title: 'Industry-Specific Training',
      duration: '6 weeks',
      description: 'Specialized training based on current TNB projects and energy transition initiatives.'
    },
    {
      title: 'Safety & Compliance',
      duration: '2 weeks',
      description: 'Workplace safety standards, regulatory compliance, and emergency procedures.'
    }
  ];

  const benefits = [
    'Full-time comprehensive training program',
    'Industry-relevant curriculum designed by experts',
    'Hands-on experience with modern equipment',
    'Industrial training with TNB and partner companies',
    'Guaranteed job placement upon graduation',
    'Competitive starting salary',
    'Career advancement opportunities',
    'Continuous professional development',
    'Health and safety certification',
    'Networking with industry professionals'
  ];

  const timeline = [
    {
      phase: 'Registration',
      duration: 'January - February 2025',
      description: 'Online application and document submission period'
    },
    {
      phase: 'Selection Process',
      duration: 'March 2025',
      description: 'Application review, interviews, and candidate selection'
    },
    {
      phase: 'Training Program',
      duration: 'April - September 2025',
      description: '6-month intensive training with theoretical and practical components'
    },
    {
      phase: 'Industrial Training',
      duration: 'October - December 2025',
      description: '3-month on-the-job training with TNB and partner companies'
    },
    {
      phase: 'Employment',
      duration: 'January 2026',
      description: 'Immediate job placement and career commencement'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Program Details
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto">
              Comprehensive training program designed to transform school leavers into skilled energy sector professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Program Overview
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  The Learn To Work 2025 program is a comprehensive 9-month journey that combines theoretical learning with practical experience. Our curriculum is specifically designed to meet the current demands of Malaysia's energy transition sector.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Participants will undergo intensive training followed by industrial training with TNB and partner companies, ensuring they are job-ready upon graduation.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-cyan-50 rounded-lg p-6">
                  <Clock className="h-8 w-8 text-purple-600 mb-3" />
                  <div className="text-2xl font-bold text-purple-600">9 Months</div>
                  <div className="text-gray-600">Total Duration</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                  <Users className="h-8 w-8 text-cyan-600 mb-3" />
                  <div className="text-2xl font-bold text-cyan-600">10,000+</div>
                  <div className="text-gray-600">Target Participants</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-purple-50 rounded-2xl p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Key Program Features</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)] rounded-full p-2 mt-1">
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Comprehensive Curriculum</div>
                    <div className="text-gray-600">26 weeks of intensive training covering all essential skills</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)] rounded-full p-2 mt-1">
                    <Briefcase className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Industrial Training</div>
                    <div className="text-gray-600">Real-world experience with TNB and partner companies</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)] rounded-full p-2 mt-1">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Job Guarantee</div>
                    <div className="text-gray-600">100% job placement rate upon successful completion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Modules */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Training Modules
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our curriculum is designed by industry experts to ensure participants gain relevant skills for the energy sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)] text-white text-sm font-semibold px-3 py-1 rounded-full">
                    Module {index + 1}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {module.duration}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {module.title}
                </h3>
                <p className="text-gray-600">
                  {module.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Program Timeline
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A structured 12-month journey from registration to employment.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)] rounded-full"></div>
            
            <div className="space-y-12">
              {timeline.map((phase, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-cyan-400">
                      <div className="flex items-center mb-4">
                        <Calendar className="h-5 w-5 text-purple-600 mr-2" />
                        <span className="text-sm font-semibold text-purple-600">{phase.duration}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {phase.phase}
                      </h3>
                      <p className="text-gray-600">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)] rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Program Benefits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive benefits that extend beyond training to ensure long-term career success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-4 bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="bg-cyan-100 rounded-full p-2">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-gray-700 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join the Learn To Work 2025 program and transform your future with guaranteed employment in Malaysia's growing energy sector.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Register Now
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transition-all duration-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramPage;