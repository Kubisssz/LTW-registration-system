import React from 'react';

interface DeclarationStepProps {
  declaration: boolean;
  onChange: (declaration: boolean) => void;
}

const DeclarationStep: React.FC<DeclarationStepProps> = ({ declaration, onChange }) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Declaration</h2>
        <p className="text-gray-600">Please read and confirm your agreement to proceed</p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Learn To Work 2025 Program Declaration</h3>
        <div className="text-sm text-gray-700 space-y-3">
          <p>
            I hereby declare that all information provided in this registration form is true, complete, and accurate to the best of my knowledge.
          </p>
          <p>
            I understand that:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Submission of this application does not guarantee selection for the Learn To Work 2025 program</li>
            <li>False or misleading information may result in disqualification from the program</li>
            <li>I may be contacted for further verification or additional information</li>
            <li>Selected candidates will be required to attend full-time training and industrial training</li>
            <li>I commit to starting employment immediately upon successful graduation from the program</li>
            <li>All uploaded documents are authentic and belong to me</li>
          </ul>
          <p>
            I agree to be contacted by TNB or authorized representatives regarding my application and the program.
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="declaration"
          checked={declaration}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="declaration" className="text-sm text-gray-700 cursor-pointer">
          <span className="font-medium">I agree to the declaration above</span> and confirm that all information provided is true and accurate. I understand the terms and conditions of the Learn To Work 2025 program. *
        </label>
      </div>
    </div>
  );
};

export default DeclarationStep;