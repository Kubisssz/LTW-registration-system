import React from 'react';
import { PersonalInfo, ValidationError } from '../types/registration';

interface PersonalInfoStepProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  errors: ValidationError[];
}

const malaysianStates = [
  'Johor', 'Kedah', 'Kelantan', 'Malacca', 'Negeri Sembilan', 'Pahang',
  'Penang', 'Perak', 'Perlis', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu',
  'Federal Territory of Kuala Lumpur', 'Federal Territory of Labuan', 'Federal Territory of Putrajaya'
];

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ data, onChange, errors }) => {
  const getError = (field: string) => errors.find(e => e.field === field)?.message;

  const handleChange = (field: keyof PersonalInfo, value: string | number) => {
    // Don't sanitize during typing - only sanitize during form submission
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Please provide your basic personal details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            maxLength={100}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              getError('fullName') ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
            autoComplete="name"
          />
          {getError('fullName') && (
            <p className="mt-1 text-sm text-red-600">{getError('fullName')}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            IC Number (NRIC) *
          </label>
          <input
            type="text"
            value={data.icNumber}
            onChange={(e) => handleChange('icNumber', e.target.value)}
            pattern="\d{6}-\d{2}-\d{4}"
            maxLength={14}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              getError('icNumber') ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="XXXXXX-XX-XXXX"
            autoComplete="off"
          />
          {getError('icNumber') && (
            <p className="mt-1 text-sm text-red-600">{getError('icNumber')}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Age *
          </label>
          <input
            type="number"
            min="18"
            max="25"
            value={data.age || ''}
            onChange={(e) => handleChange('age', parseInt(e.target.value) || 0)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              getError('age') ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your age"
            autoComplete="off"
          />
          {getError('age') && (
            <p className="mt-1 text-sm text-red-600">{getError('age')}</p>
          )}
          <p className="mt-1 text-xs text-orange-600">⚠️ You must be between 18 and 25 years old to register.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            maxLength={254}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              getError('email') ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email address"
            autoComplete="email"
          />
          {getError('email') && (
            <p className="mt-1 text-sm text-red-600">{getError('email')}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={data.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            maxLength={15}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              getError('phoneNumber') ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your phone number"
            autoComplete="tel"
          />
          {getError('phoneNumber') && (
            <p className="mt-1 text-sm text-red-600">{getError('phoneNumber')}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender *
          </label>
          <select
            value={data.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              getError('gender') ? 'border-red-500' : 'border-gray-300'
            }`}
            autoComplete="sex"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
          {getError('gender') && (
            <p className="mt-1 text-sm text-red-600">{getError('gender')}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Location (State) *
          </label>
          <select
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              getError('location') ? 'border-red-500' : 'border-gray-300'
            }`}
            autoComplete="address-level1"
          >
            <option value="">Select your state</option>
            {malaysianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {getError('location') && (
            <p className="mt-1 text-sm text-red-600">{getError('location')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;