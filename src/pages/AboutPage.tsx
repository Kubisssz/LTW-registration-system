import React from 'react';
import { Target, Users, Zap, Award, BookOpen, Briefcase } from 'lucide-react';

const AboutPage: React.FC = () => {
  const objectives = [
    {
      icon: Target,
      title: 'Bridge Skills Gap',
      description: 'Address the shortage of skilled workers in Malaysia\'s energy transition sector by training non-graduates.'
    },
    {
      icon: Users,
      title: 'Empower Youth',
      description: 'Provide opportunities for school leavers aged 18-25 who didn\'t complete SPM or failed key subjects.'
    },
    {
      icon: Zap,
      title: 'Energy Transition',
      description: 'Contribute to Malaysia\'s sustainable energy future by developing a skilled workforce.'
    },
    {
      icon: Award,
      title: 'Guaranteed Employment',
      description: 'Ensure every graduate secures immediate employment upon program completion.'
    }
  ];

  const programFlow = [
    {
      step: '01',
      title: 'Registration & Selection',
      description: 'Apply online and go through our selection process based on eligibility criteria.'
    },
    {
      step: '02',
      title: 'Comprehensive Training',
      description: 'Attend full-time training with modules designed for current industry demands.'
    },
    {
      step: '03',
      title: 'Industrial Training',
      description: 'Gain hands-on experience through industrial training with TNB and partner companies.'
    },
    {
      step: '04',
      title: 'Job Placement',
      description: 'Graduate with secured employment and start your career immediately.'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              About Learn To Work 2025
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto">
              A transformative TVET 2.0 program designed to empower Malaysian youth and drive the nation's energy transition forward.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To transform the lives of Malaysian school leavers by providing comprehensive technical and vocational training that leads to secured employment in the energy sector. We believe that every young Malaysian deserves a second chance to build a successful career, regardless of their academic background.
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To be Malaysia's leading workforce development program that bridges the gap between education and employment, creating a skilled workforce ready to drive the nation's energy transition and sustainable development goals.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-purple-50 rounded-2xl p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Impact</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    10K+
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Target Participants</div>
                    <div className="text-gray-600">School leavers to be trained</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    100%
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Job Placement</div>
                    <div className="text-gray-600">Guaranteed employment rate</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    2025
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Launch Year</div>
                    <div className="text-gray-600">Program commencement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Objectives */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Program Objectives
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive approach addresses multiple aspects of workforce development and youth empowerment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {objectives.map((objective, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)] w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <objective.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {objective.title}
                </h3>
                <p className="text-gray-600">
                  {objective.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Flow */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our structured approach ensures every participant receives comprehensive training and support throughout their journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programFlow.map((phase, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border-t-4 border-cyan-400">
                  <div className="text-4xl font-bold text-purple-600 mb-4">
                    {phase.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {phase.title}
                  </h3>
                  <p className="text-gray-600">
                    {phase.description}
                  </p>
                </div>
                
                {index < programFlow.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)]"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Group */}
      <section className="py-20 bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Who Can Apply?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              This program is specifically designed for Malaysian school leavers who need a pathway to skilled employment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 border border-white border-opacity-20">
              <Users className="h-12 w-12 text-cyan-300 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Age Requirement</h3>
              <p className="text-blue-100">
                Young Malaysians aged between 18 and 25 years old who are ready to start their career journey.
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 border border-white border-opacity-20">
              <BookOpen className="h-12 w-12 text-cyan-300 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Education Background</h3>
              <p className="text-blue-100">
                School leavers who did not complete SPM or did not pass Bahasa Melayu (BM) or Sejarah subjects.
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 border border-white border-opacity-20">
              <Briefcase className="h-12 w-12 text-cyan-300 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Commitment Level</h3>
              <p className="text-blue-100">
                Individuals committed to full-time training, industrial training, and immediate employment upon graduation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;