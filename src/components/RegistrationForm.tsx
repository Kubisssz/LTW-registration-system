import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { RegistrationData, PersonalInfo, EligibilityInfo, DocumentInfo, ValidationError } from '../types/registration';
import { validatePersonalInfo, validateEligibility, isEligible } from '../utils/validation';
import { rateLimiter, secureStorage, csrfToken, securityLogger } from '../utils/security';
import ProgressBar from './ProgressBar';
import PersonalInfoStep from './PersonalInfoStep';
import EligibilityStep from './EligibilityStep';
import DocumentUploadStep from './DocumentUploadStep';
import DeclarationStep from './DeclarationStep';

const RegistrationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  
  const [formData, setFormData] = useState<RegistrationData>({
    personalInfo: {
      fullName: '',
      icNumber: '',
      email: '',
      phoneNumber: '',
      age: 0,
      gender: '',
      location: '',
    },
    eligibilityInfo: {
      spmStatus: '',
      fullTimeTraining: false,
      industrialTraining: false,
      workCommitment: false,
    },
    documentInfo: {
      icFile: null,
      resumeFile: null,
      supportingFile: null,
    },
    declaration: false,
  });

  const totalSteps = 4;

  // Load saved data on component mount
  useEffect(() => {
    const savedData = secureStorage.getItem('registrationFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(prev => ({ ...prev, ...parsedData }));
      } catch (error) {
        console.error('Failed to load saved form data:', error);
        securityLogger.logSuspiciousActivity('Invalid stored data format', { error });
        // Clear corrupted data to prevent future parsing errors
        secureStorage.removeItem('registrationFormData');
      }
    }
  }, []);

  // Auto-save form data with enhanced security
  useEffect(() => {
    const dataToSave = {
      personalInfo: formData.personalInfo,
      eligibilityInfo: formData.eligibilityInfo,
      declaration: formData.declaration
    };
    secureStorage.setItem('registrationFormData', JSON.stringify(dataToSave));
  }, [formData]);

  const updatePersonalInfo = (data: PersonalInfo) => {
    setFormData(prev => ({ ...prev, personalInfo: data }));
    setErrors([]);
  };

  const updateEligibilityInfo = (data: EligibilityInfo) => {
    setFormData(prev => ({ ...prev, eligibilityInfo: data }));
    setErrors([]);
  };

  const updateDocumentInfo = (data: DocumentInfo) => {
    setFormData(prev => ({ ...prev, documentInfo: data }));
  };

  const updateDeclaration = (declaration: boolean) => {
    setFormData(prev => ({ ...prev, declaration }));
  };

  const validateCurrentStep = (): boolean => {
    let stepErrors: ValidationError[] = [];

    switch (currentStep) {
      case 1:
        stepErrors = validatePersonalInfo(formData.personalInfo);
        break;
      case 2:
        stepErrors = validateEligibility(formData.eligibilityInfo);
        // Check if user is disqualified
        if (formData.eligibilityInfo.spmStatus && !isEligible(formData.eligibilityInfo.spmStatus)) {
          stepErrors.push({ field: 'spmStatus', message: 'You do not meet the eligibility criteria for this program.' });
          securityLogger.logSuspiciousActivity('Ineligible user attempting to proceed', { 
            spmStatus: formData.eligibilityInfo.spmStatus 
          });
        }
        break;
      case 3:
        if (!formData.documentInfo.icFile) {
          stepErrors.push({ field: 'icFile', message: 'IC document is required' });
        }
        if (!formData.documentInfo.resumeFile) {
          stepErrors.push({ field: 'resumeFile', message: 'Resume is required' });
        }
        if (!formData.documentInfo.supportingFile) {
          stepErrors.push({ field: 'supportingFile', message: 'Supporting document is required' });
        }
        break;
      case 4:
        if (!formData.declaration) {
          stepErrors.push({ field: 'declaration', message: 'You must agree to the declaration to proceed' });
        }
        break;
    }

    setErrors(stepErrors);
    return stepErrors.length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors([]);
    }
  };

  const handleSubmit = () => {
    // Enhanced rate limiting check
    const userIdentifier = formData.personalInfo.email || formData.personalInfo.icNumber || 'anonymous';
    if (!rateLimiter.isAllowed(userIdentifier)) {
      setIsRateLimited(true);
      setRemainingTime(rateLimiter.getRemainingTime(userIdentifier));
      securityLogger.logRateLimitViolation(userIdentifier);
      return;
    }

    // CSRF token validation (placeholder)
    const token = csrfToken.get();
    if (!token) {
      console.warn('CSRF token not found');
    }

    if (validateCurrentStep()) {
      // Enhanced form submission with security logging
      console.log('Form submitted:', {
        ...formData,
        documentInfo: {
          icFile: formData.documentInfo.icFile?.name,
          resumeFile: formData.documentInfo.resumeFile?.name,
          supportingFile: formData.documentInfo.supportingFile?.name
        }
      });
      
      // Clear saved data after successful submission
      secureStorage.removeItem('registrationFormData');
      
      setIsSubmitted(true);
    }
  };

  const canProceed = () => {
    if (currentStep === 2 && formData.eligibilityInfo.spmStatus) {
      return isEligible(formData.eligibilityInfo.spmStatus);
    }
    return true;
  };

  // Update remaining time for rate limiting
  useEffect(() => {
    if (isRateLimited && remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1000) {
            setIsRateLimited(false);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRateLimited, remainingTime]);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-red-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for registering for the Learn To Work 2025 program. We have received your application and will contact you soon regarding the next steps.
          </p>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-purple-700">
              Please check your email for a confirmation and keep your documents ready for the verification process.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-red-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
              Learn To Work 2025 Registration
            </h1>
            <p className="text-center text-gray-600">
              TVET 2.0 Program - Graduate with secured employment
            </p>
          </div>

          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

          <div className="mb-8">
            {currentStep === 1 && (
              <PersonalInfoStep
                data={formData.personalInfo}
                onChange={updatePersonalInfo}
                errors={errors}
              />
            )}
            {currentStep === 2 && (
              <EligibilityStep
                data={formData.eligibilityInfo}
                onChange={updateEligibilityInfo}
                errors={errors}
              />
            )}
            {currentStep === 3 && (
              <DocumentUploadStep
                data={formData.documentInfo}
                onChange={updateDocumentInfo}
              />
            )}
            {currentStep === 4 && (
              <DeclarationStep
                declaration={formData.declaration}
                onChange={updateDeclaration}
              />
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center space-x-2 px-6 py-2 bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)] text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isRateLimited}
                className="px-6 py-2 bg-[linear-gradient(-225deg,_#2CD8D5_0%,_#6B8DD6_48%,_#8E37D7_100%)] text-white rounded-lg hover:opacity-90 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRateLimited ? `Wait ${Math.ceil(remainingTime / 1000)}s` : 'Submit Registration'}
              </button>
            )}
          </div>

          {errors.length > 0 && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700 font-medium mb-2">Please fix the following errors:</p>
              <ul className="text-sm text-red-600 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error.message}</li>
                ))}
              </ul>
            </div>
          )}

          {isRateLimited && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-700 font-medium">
                Too many submission attempts. Please wait {Math.ceil(remainingTime / 1000)} seconds before trying again.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;