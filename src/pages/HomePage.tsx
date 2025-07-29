import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, Briefcase, Award, CheckCircle, Star, TrendingUp } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Training',
      description: 'Industry-relevant modules developed based on current market demands and TNB Energy Transition projects.'
    },
    {
      icon: Briefcase,
      title: 'Industrial Training',
      description: 'Hands-on experience with TNB and partner companies to prepare you for real-world challenges.'
    },
    {
      icon: Award,
      title: 'Secured Employment',
      description: 'Graduate with guaranteed job placement and start your career immediately upon completion.'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Build a sustainable career in Malaysia\'s growing energy transition sector.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Target Participants' },
    { number: '100%', label: 'Job Placement Rate' },
    { number: '18-25', label: 'Age Range' },
    { number: '2025', label: 'Program Launch' }
  ];

  const testimonials = [
    {
      name: 'Ahmad Rahman',
      role: 'Program Graduate 2024',
      content: 'This program changed my life completely. From not completing SPM to having a secure job in the energy sector.',
      rating: 5
    },
    {
      name: 'Siti Nurhaliza',
      role: 'Current Trainee',
      content: 'The training is comprehensive and the instructors are very supportive. I feel confident about my future.',
      rating: 5
    },
    {
      name: 'Raj Kumar',
      role: 'Program Graduate 2024',
      content: 'Industrial training with TNB gave me real experience. Now I\'m working full-time and loving it.',
      rating: 5
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Learn To Work
                  <span className="block text-cyan-300">2025</span>
                </h1>
                <p className="text-xl lg:text-2xl text-blue-100">
                  Graduate with Secured Employment
                </p>
                <p className="text-lg text-gray-200 max-w-2xl">
                  TVET 2.0 Program designed to train non-graduates to be skilled workforce that able to contribute towards Malaysia's Energy Transition.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Register Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/program"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-900 transition-all duration-200"
                >
                  Learn More
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-cyan-300" />
                  <span>Age 18-25</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-cyan-300" />
                  <span>No SPM Required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-cyan-300" />
                  <span>Job Guaranteed</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
                <h3 className="text-2xl font-bold mb-6">Program Highlights</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-cyan-400 rounded-full p-1">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span>Full-time comprehensive training</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-cyan-400 rounded-full p-1">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span>Industrial training with TNB</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-cyan-400 rounded-full p-1">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span>Immediate employment upon graduation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-cyan-400 rounded-full p-1">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span>Energy transition focus</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Learn To Work 2025?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive program is designed to transform school leavers into skilled professionals ready for Malaysia's energy future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)] w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our graduates and current trainees
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of young Malaysians who are building successful careers in the energy sector. Registration is now open for the 2025 program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Registration
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;