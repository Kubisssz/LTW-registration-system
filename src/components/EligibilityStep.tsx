import React from 'react';
import { EligibilityInfo, ValidationError } from '../types/registration';
import { isEligible } from '../utils/validation';

interface EligibilityStepProps {
  data: EligibilityInfo;
  onChange: (data: EligibilityInfo) => void;
  errors: ValidationError[];
}

const EligibilityStep: React.FC<EligibilityStepProps> = ({ data, onChange, errors }) => {
  const getError = (field: string) => errors.find(e => e.field === field)?.message;

  const handleSpmStatusChange = (value: string) => {
    onChange({ ...data, spmStatus: value });
  };

  const handleBooleanChange = (field: keyof EligibilityInfo, value: boolean) => {
    onChange({ ...data, [field]: value });
  };

  const showDisqualification = data.spmStatus === 'passed-both';

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Eligibility Check</h2>
        <p className="text-gray-600">Please answer the following questions to determine your eligibility</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Have you completed your SPM? *
          </label>
          <div className="space-y-3">
            {[
              { value: 'not-completed', label: 'No, I did not complete SPM' },
              { value: 'failed-bm', label: 'Yes, but I did not pass Bahasa Melayu (BM)' },
              { value: 'failed-sejarah', label: 'Yes, but I did not pass Sejarah' },
              { value: 'passed-both', label: 'I passed both BM and Sejarah' }
            ].map(option => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="spmStatus"
                  value={option.value}
                  checked={data.spmStatus === option.value}
                  onChange={(e) => handleSpmStatusChange(e.target.value)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {getError('spmStatus') && (
            <p className="mt-2 text-sm text-red-600">{getError('spmStatus')}</p>
          )}
        </div>

        {showDisqualification && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <span className="text-red-600 text-lg">🛑</span>
              <div>
                <h3 className="text-sm font-medium text-red-800">Not Eligible</h3>
                <p className="text-sm text-red-700">
                  You must either not have completed SPM or failed BM/Sejarah to qualify for this program.
                </p>
              </div>
            </div>
          </div>
        )}

        {data.spmStatus && isEligible(data.spmStatus) && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <span className="text-green-600 text-lg">✅</span>
                <div>
                  <h3 className="text-sm font-medium text-green-800">Eligible</h3>
                  <p className="text-sm text-green-700">
                    Great! You meet the basic eligibility criteria. Please continue with the remaining questions.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Are you willing to attend full-time training under this program? *
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="fullTimeTraining"
                    checked={data.fullTimeTraining === true}
                    onChange={() => handleBooleanChange('fullTimeTraining', true)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="fullTimeTraining"
                    checked={data.fullTimeTraining === false}
                    onChange={() => handleBooleanChange('fullTimeTraining', false)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Are you willing to undergo industrial training with TNB or other companies? *
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="industrialTraining"
                    checked={data.industrialTraining === true}
                    onChange={() => handleBooleanChange('industrialTraining', true)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="industrialTraining"
                    checked={data.industrialTraining === false}
                    onChange={() => handleBooleanChange('industrialTraining', false)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Are you committed to start working immediately after graduation from the program? *
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="workCommitment"
                    checked={data.workCommitment === true}
                    onChange={() => handleBooleanChange('workCommitment', true)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="workCommitment"
                    checked={data.workCommitment === false}
                    onChange={() => handleBooleanChange('workCommitment', false)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EligibilityStep;