import React from 'react';
import { DocumentInfo } from '../types/registration';
import FileUpload from './FileUpload';

interface DocumentUploadStepProps {
  data: DocumentInfo;
  onChange: (data: DocumentInfo) => void;
}

const DocumentUploadStep: React.FC<DocumentUploadStepProps> = ({ data, onChange }) => {
  const handleFileChange = (field: keyof DocumentInfo, file: File | null) => {
    onChange({ ...data, [field]: file });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Upload</h2>
        <p className="text-gray-600">Please upload the required documents to complete your registration</p>
      </div>

      <div className="space-y-6">
        <FileUpload
          label="Upload a copy of your IC (NRIC) *"
          acceptedTypes=".pdf,.jpg,.jpeg,.png"
          file={data.icFile}
          onFileSelect={(file) => handleFileChange('icFile', file)}
        />

        <FileUpload
          label="Upload your resume *"
          acceptedTypes=".pdf,.doc,.docx"
          file={data.resumeFile}
          onFileSelect={(file) => handleFileChange('resumeFile', file)}
        />

        <FileUpload
          label="Upload supporting document as school leaver (e.g. SPM slip, school letter) *"
          acceptedTypes=".pdf,.jpg,.jpeg,.png"
          file={data.supportingFile}
          onFileSelect={(file) => handleFileChange('supportingFile', file)}
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-blue-600 text-lg">ℹ️</span>
          <div>
            <h3 className="text-sm font-medium text-blue-800">File Upload Guidelines</h3>
            <ul className="text-sm text-blue-700 mt-2 space-y-1">
              <li>• Maximum file size: 10MB per file</li>
              <li>• Accepted formats: PDF, JPG, PNG for documents; PDF, DOC, DOCX for resume</li>
              <li>• Ensure all documents are clear and readable</li>
              <li>• All documents must be authentic and valid</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadStep;