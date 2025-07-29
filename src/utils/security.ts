import DOMPurify from 'dompurify';

// Enhanced input sanitization utility with additional security measures
export const sanitizeInput = (input: string): string => {
  // Remove potential SQL injection patterns but preserve spaces
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi,
    /(--|\/\*|\*\/|;|'|"|`)/g,
    /(\bOR\b|\bAND\b)\s+\d+\s*=\s*\d+/gi
  ];
  
  let sanitized = input.trim();
  
  // Remove SQL injection patterns
  sqlPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });
  
  // Use DOMPurify for XSS protection but preserve spaces
  sanitized = DOMPurify.sanitize(sanitized, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
    ALLOW_DATA_ATTR: false,
    WHITESPACE_IS_SIGNIFICANT: true
  });
  
  // Additional character filtering but keep spaces
  sanitized = sanitized.replace(/[<>{}]/g, '');
  
  return sanitized;
};

// Enhanced email validation with security considerations
export const isValidEmail = (email: string): boolean => {
  // Check for common injection patterns
  const dangerousPatterns = [
    /javascript:/i,
    /data:/i,
    /vbscript:/i,
    /onload/i,
    /onerror/i,
    /<script/i,
    /eval\(/i
  ];
  
  if (dangerousPatterns.some(pattern => pattern.test(email))) {
    return false;
  }
  
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254 && email.length >= 5;
};

// Enhanced phone number validation
export const isValidPhoneNumber = (phone: string): boolean => {
  // Remove potential injection patterns
  const cleanPhone = phone.replace(/[^\d+\-\s()]/g, '');
  const phoneRegex = /^(\+?6?01)[0-46-9]-*[0-9]{7,8}$/;
  return phoneRegex.test(cleanPhone.replace(/\s/g, ''));
};

// Enhanced IC number validation for Malaysian NRIC
export const isValidICNumber = (ic: string): boolean => {
  // Remove potential injection patterns
  const cleanIC = ic.replace(/[^\d\-]/g, '');
  const icRegex = /^\d{6}-\d{2}-\d{4}$/;
  return icRegex.test(cleanIC);
};

// Enhanced Rate limiting with better security
class EnhancedRateLimiter {
  private attempts: Map<string, { count: number; lastAttempt: number; blocked: boolean }> = new Map();
  private readonly maxAttempts = 3; // Reduced for better security
  private readonly windowMs = 15 * 60 * 1000; // 15 minutes
  private readonly blockDuration = 30 * 60 * 1000; // 30 minutes block

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier);

    if (!userAttempts) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now, blocked: false });
      return true;
    }

    // Check if user is blocked
    if (userAttempts.blocked && (now - userAttempts.lastAttempt) < this.blockDuration) {
      return false;
    }

    // Reset if window has passed
    if (now - userAttempts.lastAttempt > this.windowMs) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now, blocked: false });
      return true;
    }

    // Check if under limit
    if (userAttempts.count < this.maxAttempts) {
      userAttempts.count++;
      userAttempts.lastAttempt = now;
      return true;
    }

    // Block user
    userAttempts.blocked = true;
    userAttempts.lastAttempt = now;
    return false;
  }

  getRemainingTime(identifier: string): number {
    const userAttempts = this.attempts.get(identifier);
    if (!userAttempts) return 0;
    
    const elapsed = Date.now() - userAttempts.lastAttempt;
    const timeToWait = userAttempts.blocked ? this.blockDuration : this.windowMs;
    return Math.max(0, timeToWait - elapsed);
  }

  // Clear old entries periodically
  cleanup(): void {
    const now = Date.now();
    for (const [key, value] of this.attempts.entries()) {
      if (now - value.lastAttempt > this.blockDuration) {
        this.attempts.delete(key);
      }
    }
  }
}

export const rateLimiter = new EnhancedRateLimiter();

// Periodic cleanup
setInterval(() => {
  rateLimiter.cleanup();
}, 5 * 60 * 1000); // Every 5 minutes

// Enhanced Content Security Policy headers
export const getEnhancedCSPHeaders = () => ({
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https:; media-src 'self'; object-src 'none'; child-src 'none'; frame-src 'none'; worker-src 'self'; manifest-src 'self'; form-action 'self'; base-uri 'self';",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), speaker=(), vibrate=(), fullscreen=(self), sync-xhr=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Feature-Policy': 'geolocation \'none\'; microphone \'none\'; camera \'none\''
});

// Enhanced secure session storage utility
export const secureStorage = {
  setItem: (key: string, value: string): void => {
    try {
      const sanitizedKey = sanitizeInput(key);
      
      // Add timestamp and integrity check
      const dataWithMeta = {
        value: value, // Don't sanitize the JSON string value
        timestamp: Date.now(),
        checksum: btoa(value).slice(0, 10) // Simple integrity check
      };
      
      sessionStorage.setItem(sanitizedKey, JSON.stringify(dataWithMeta));
    } catch (error) {
      console.error('Failed to store data securely:', error);
    }
  },
  
  getItem: (key: string): string | null => {
    try {
      const sanitizedKey = sanitizeInput(key);
      const storedData = sessionStorage.getItem(sanitizedKey);
      
      if (!storedData) return null;
      
      const parsedData = JSON.parse(storedData);
      
      // Check data age (expire after 1 hour)
      if (Date.now() - parsedData.timestamp > 60 * 60 * 1000) {
        sessionStorage.removeItem(sanitizedKey);
        return null;
      }
      
      // Verify integrity
      const expectedChecksum = btoa(parsedData.value).slice(0, 10);
      if (parsedData.checksum !== expectedChecksum) {
        sessionStorage.removeItem(sanitizedKey);
        return null;
      }
      
      return parsedData.value; // Return the raw JSON string without sanitization
    } catch (error) {
      console.error('Failed to retrieve data securely:', error);
      return null;
    }
  },
  
  removeItem: (key: string): void => {
    try {
      const sanitizedKey = sanitizeInput(key);
      sessionStorage.removeItem(sanitizedKey);
    } catch (error) {
      console.error('Failed to remove data securely:', error);
    }
  },
  
  // Clear all expired items
  cleanup: (): void => {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key) {
          const item = this.getItem(key);
          if (!item) {
            keysToRemove.push(key);
          }
        }
      }
      keysToRemove.forEach(key => sessionStorage.removeItem(key));
    } catch (error) {
      console.error('Failed to cleanup storage:', error);
    }
  }
};

// CSRF Token management (placeholder for server implementation)
export const csrfToken = {
  get: (): string => {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    return token || '';
  },
  
  validate: (token: string): boolean => {
    const currentToken = csrfToken.get();
    return currentToken !== '' && currentToken === token;
  }
};

// File type validation with enhanced security
export const validateFileType = (file: File): boolean => {
  const allowedTypes = {
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png']
  };
  
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  const allowedExtensions = allowedTypes[file.type as keyof typeof allowedTypes];
  
  return allowedExtensions && allowedExtensions.includes(fileExtension);
};

// Enhanced security logging (for development)
export const securityLogger = {
  logSuspiciousActivity: (activity: string, details: any): void => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`🚨 Security Alert: ${activity}`, details);
    }
  },
  
  logRateLimitViolation: (identifier: string): void => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`🚨 Rate Limit Violation: ${identifier}`);
    }
  }
};

// Initialize security cleanup
setInterval(() => {
  secureStorage.cleanup();
}, 10 * 60 * 1000); // Every 10 minutes