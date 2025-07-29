import { PersonalInfo, EligibilityInfo, ValidationError } from '../types/registration';
import { sanitizeInput, isValidEmail, isValidPhoneNumber, isValidICNumber } from './security';

export const validatePersonalInfo = (data: PersonalInfo): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Sanitize and validate full name
  const sanitizedFullName = sanitizeInput(data.fullName);
  if (!data.fullName.trim()) {
    errors.push({ field: 'fullName', message: 'Full name is required' });
  } else if (data.fullName.length < 2 || data.fullName.length > 100) {
    errors.push({ field: 'fullName', message: 'Full name must be between 2 and 100 characters' });
  } else if (!/^[a-zA-Z\s@/.',-]+$/.test(data.fullName)) {
    errors.push({ field: 'fullName', message: 'Full name contains invalid characters' });
  } else if (sanitizedFullName !== data.fullName.trim()) {
    errors.push({ field: 'fullName', message: 'Full name contains potentially harmful content' });
  }

  // Validate IC number
  const sanitizedIC = sanitizeInput(data.icNumber);
  if (!data.icNumber.trim()) {
    errors.push({ field: 'icNumber', message: 'IC number is required' });
  } else if (!isValidICNumber(data.icNumber)) {
    errors.push({ field: 'icNumber', message: 'IC number format should be XXXXXX-XX-XXXX' });
  } else if (sanitizedIC !== data.icNumber.trim()) {
    errors.push({ field: 'icNumber', message: 'IC number contains potentially harmful content' });
  }

  // Validate email
  const sanitizedEmail = sanitizeInput(data.email);
  if (!data.email.trim()) {
    errors.push({ field: 'email', message: 'Email address is required' });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  } else if (sanitizedEmail !== data.email.trim()) {
    errors.push({ field: 'email', message: 'Email contains potentially harmful content' });
  }

  // Validate phone number
  const sanitizedPhone = sanitizeInput(data.phoneNumber);
  if (!data.phoneNumber.trim()) {
    errors.push({ field: 'phoneNumber', message: 'Phone number is required' });
  } else if (!isValidPhoneNumber(data.phoneNumber)) {
    errors.push({ field: 'phoneNumber', message: 'Please enter a valid Malaysian phone number' });
  } else if (sanitizedPhone !== data.phoneNumber.trim()) {
    errors.push({ field: 'phoneNumber', message: 'Phone number contains potentially harmful content' });
  }

  // Validate age
  if (!data.age || data.age < 18 || data.age > 25) {
    errors.push({ field: 'age', message: 'Age must be between 18 and 25 years old' });
  }

  // Validate gender
  const allowedGenders = ['male', 'female', 'prefer-not-to-say'];
  if (!data.gender || !allowedGenders.includes(data.gender)) {
    errors.push({ field: 'gender', message: 'Please select a valid gender option' });
  }

  // Validate location
  const sanitizedLocation = sanitizeInput(data.location);
  if (!data.location.trim()) {
    errors.push({ field: 'location', message: 'Please select your current location' });
  } else if (sanitizedLocation !== data.location.trim()) {
    errors.push({ field: 'location', message: 'Location contains potentially harmful content' });
  }

  return errors;
};

export const validateEligibility = (data: EligibilityInfo): ValidationError[] => {
  const errors: ValidationError[] = [];

  const allowedSpmStatuses = ['not-completed', 'failed-bm', 'failed-sejarah', 'passed-both'];
  if (!data.spmStatus || !allowedSpmStatuses.includes(data.spmStatus)) {
    errors.push({ field: 'spmStatus', message: 'Please select a valid SPM status' });
  }

  // Validate boolean fields
  if (typeof data.fullTimeTraining !== 'boolean') {
    errors.push({ field: 'fullTimeTraining', message: 'Please answer the full-time training question' });
  }

  if (typeof data.industrialTraining !== 'boolean') {
    errors.push({ field: 'industrialTraining', message: 'Please answer the industrial training question' });
  }

  if (typeof data.workCommitment !== 'boolean') {
    errors.push({ field: 'workCommitment', message: 'Please answer the work commitment question' });
  }

  return errors;
};

export const isEligible = (spmStatus: string): boolean => {
  const allowedStatuses = ['not-completed', 'failed-bm', 'failed-sejarah'];
  return allowedStatuses.includes(spmStatus);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// File validation
export const validateFile = (file: File, allowedTypes: string[], maxSize: number = 10 * 1024 * 1024): { isValid: boolean; error?: string } => {
  // Check file size (10MB limit)
  if (file.size > maxSize) {
    return { isValid: false, error: 'File size exceeds 10MB limit' };
  }

  // Check file type
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  if (!fileExtension || !allowedTypes.includes(`.${fileExtension}`)) {
    return { isValid: false, error: `File type not allowed. Accepted types: ${allowedTypes.join(', ')}` };
  }

  // Check MIME type
  const allowedMimeTypes = {
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png'
  };

  const expectedMimeType = allowedMimeTypes[`.${fileExtension}` as keyof typeof allowedMimeTypes];
  if (expectedMimeType && file.type !== expectedMimeType) {
    return { isValid: false, error: 'File type mismatch detected' };
  }

  return { isValid: true };
};

// Enhanced input validation for contact form
export const validateContactInput = (input: string, fieldName: string): { isValid: boolean; error?: string } => {
  const sanitized = sanitizeInput(input);
  
  if (sanitized !== input.trim()) {
    return { 
      isValid: false, 
      error: `${fieldName} contains potentially harmful content and has been blocked for security reasons.` 
    };
  }
  
  return { isValid: true };
};