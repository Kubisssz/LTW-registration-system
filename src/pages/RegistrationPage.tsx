import React from 'react';
import RegistrationForm from '../components/RegistrationForm';

const RegistrationPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen">
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;