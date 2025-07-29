import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { sanitizeInput, rateLimiter } from '../utils/security';
import { validateContactInput } from '../utils/validation';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Clear previous validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    // Validate each field for security issues
    const fieldsToValidate = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'subject', label: 'Subject' },
      { key: 'message', label: 'Message' }
    ];
    
    fieldsToValidate.forEach(field => {
      const validation = validateContactInput(formData[field.key as keyof typeof formData], field.label);
      if (!validation.isValid) {
        errors[field.key] = validation.error || `${field.label} contains invalid content`;
      }
    });
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form for security issues
    if (!validateForm()) {
      return;
    }
    
    // Sanitize data only when submitting
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      subject: sanitizeInput(formData.subject),
      message: sanitizeInput(formData.message)
    };
    
    // Check rate limiting
    const userIdentifier = sanitizedData.email || 'anonymous';
    if (!rateLimiter.isAllowed(userIdentifier)) {
      setIsRateLimited(true);
      setRemainingTime(rateLimiter.getRemainingTime(userIdentifier));
      return;
    }

    // Here you would typically send the form data to your backend
    console.log('Contact form submitted:', sanitizedData);
    setIsSubmitted(true);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Address',
      details: 'info@learntowork2025.my',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Phone Number',
      details: '+60 3-2345 6789',
      description: 'Call us during business hours'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      details: 'TNB Headquarters, Kuala Lumpur',
      description: 'Visit us for in-person consultation'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon - Fri: 9:00 AM - 5:00 PM',
      description: 'We\'re here to help during these hours'
    }
  ];

  const faqs = [
    {
      question: 'What are the age requirements for the program?',
      answer: 'Applicants must be between 18 and 25 years old to be eligible for the Learn To Work 2025 program.'
    },
    {
      question: 'Do I need to have completed SPM to apply?',
      answer: 'No, this program is specifically designed for school leavers who did not complete SPM or did not pass BM/Sejarah subjects.'
    },
    {
      question: 'Is job placement really guaranteed?',
      answer: 'Yes, we guarantee job placement for all participants who successfully complete the training program and industrial training.'
    },
    {
      question: 'What documents do I need to submit?',
      answer: 'You need to submit a copy of your IC (NRIC), your resume, and supporting documents as a school leaver (e.g., SPM slip, school letter).'
    },
    {
      question: 'When does the program start?',
      answer: 'The program is scheduled to begin in April 2025, with registration opening in January 2025.'
    },
    {
      question: 'Is there any cost to participate in the program?',
      answer: 'The program is fully sponsored. There are no fees for participants to attend the training.'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-cyan-50 via-white to-purple-50 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for contacting us. We have received your message and will get back to you within 24 hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)] text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-all duration-200"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto">
              Have questions about the Learn To Work 2025 program? We're here to help you get started on your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to reach us for any questions or support you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)] w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <info.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {info.title}
                </h3>
                <p className="text-lg font-medium text-purple-600 mb-2">
                  {info.details}
                </p>
                <p className="text-gray-600 text-sm">
                  {info.description}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        validationErrors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                      autoComplete="name"
                    />
                    {validationErrors.name && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      maxLength={254}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        validationErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                    {validationErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={15}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        validationErrors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your phone number"
                      autoComplete="tel"
                    />
                    {validationErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        validationErrors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="eligibility">Eligibility Questions</option>
                      <option value="application">Application Process</option>
                      <option value="program">Program Details</option>
                      <option value="technical">Technical Support</option>
                      <option value="other">Other</option>
                    </select>
                    {validationErrors.subject && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.subject}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    maxLength={1000}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${
                      validationErrors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your message here..."
                  ></textarea>
                  {validationErrors.message && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isRateLimited}
                  className="w-full bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)] text-white py-4 px-6 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                  <span>{isRateLimited ? `Wait ${Math.ceil(remainingTime / 1000)}s` : 'Send Message'}</span>
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h4>
                    <p className="text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;