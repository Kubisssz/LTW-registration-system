import React, { useRef } from 'react';
import { Upload, File, X } from 'lucide-react';
import { formatFileSize, validateFile } from '../utils/validation';

interface FileUploadProps {
  label: string;
  acceptedTypes: string;
  file: File | null;
  onFileSelect: (file: File | null) => void;
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  acceptedTypes,
  file,
  onFileSelect,
  error,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    
    if (selectedFile) {
      // Validate file before accepting
      const allowedTypes = acceptedTypes.split(',').map(type => type.trim());
      const validation = validateFile(selectedFile, allowedTypes);
      
      if (!validation.isValid) {
        alert(validation.error);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }
    }
    
    onFileSelect(selectedFile);
  };

  const handleRemoveFile = () => {
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-colors duration-200"
        >
          <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">Click to upload file</p>
          <p className="text-xs text-gray-500 mt-1">Accepted formats: {acceptedTypes}</p>
          <p className="text-xs text-gray-500">Maximum size: 10MB</p>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <File className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">{file.name}</p>
              <p className="text-xs text-green-600">{formatFileSize(file.size)}</p>
            </div>
          </div>
          <button
            onClick={handleRemoveFile}
            className="text-red-500 hover:text-red-700 transition-colors"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileChange}
        className="hidden"
      />
      
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FileUpload;