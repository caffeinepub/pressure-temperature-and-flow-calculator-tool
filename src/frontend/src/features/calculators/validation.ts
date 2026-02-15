export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateNumericInput(value: string, fieldName: string): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  const num = parseFloat(value);
  
  if (isNaN(num)) {
    return { isValid: false, error: `${fieldName} must be a valid number` };
  }
  
  return { isValid: true };
}

export function validatePositiveNumber(value: string, fieldName: string): ValidationResult {
  const basicValidation = validateNumericInput(value, fieldName);
  if (!basicValidation.isValid) return basicValidation;
  
  const num = parseFloat(value);
  
  if (num <= 0) {
    return { isValid: false, error: `${fieldName} must be greater than 0` };
  }
  
  return { isValid: true };
}

export function validateKelvinResult(kelvin: number): ValidationResult {
  if (kelvin < 0) {
    return { 
      isValid: false, 
      error: 'Result would be below absolute zero (0 K). Please check your input.' 
    };
  }
  
  return { isValid: true };
}

export function parseNumericValue(value: string): number | null {
  if (!value || value.trim() === '') return null;
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
}
