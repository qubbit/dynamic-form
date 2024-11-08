import { FieldSchema, FormData, ValidationError } from '../types/schema';

export const validateField = (
  field: FieldSchema,
  value: any,
  formData: FormData
): string | null => {
  // Check if field should be validated based on dependencies
  if (field.dependsOn) {
    const dependentValue = formData[field.dependsOn.field];
    if (dependentValue !== field.dependsOn.value) {
      return null;
    }
  }

  // Required field validation
  if (field.required && (value === undefined || value === null || value === '')) {
    return `${field.label} is required`;
  }

  if (value === undefined || value === null || value === '') {
    return null;
  }

  // Type-specific validation
  switch (field.type) {
    case 'string':
      if (field.validation?.minLength && value.length < field.validation.minLength) {
        return field.validation.message || `Minimum length is ${field.validation.minLength}`;
      }
      if (field.validation?.pattern) {
        const regex = new RegExp(field.validation.pattern);
        if (!regex.test(value)) {
          return field.validation.message || 'Invalid format';
        }
      }
      break;

    case 'number':
      const numValue = Number(value);
      if (isNaN(numValue)) {
        return 'Must be a valid number';
      }
      if (field.validation?.min !== undefined && numValue < field.validation.min) {
        return field.validation.message || `Minimum value is ${field.validation.min}`;
      }
      if (field.validation?.max !== undefined && numValue > field.validation.max) {
        return field.validation.message || `Maximum value is ${field.validation.max}`;
      }
      break;

    case 'array':
      if (field.validation?.min && (!Array.isArray(value) || value.length < field.validation.min)) {
        return field.validation.message || `Select at least ${field.validation.min} option(s)`;
      }
      break;
  }

  return null;
};

export const validateForm = (
  fields: FieldSchema[],
  formData: FormData
): ValidationError[] => {
  const errors: ValidationError[] = [];

  fields.forEach(field => {
    const error = validateField(field, formData[field.name], formData);
    if (error) {
      errors.push({ field: field.name, message: error });
    }
  });

  return errors;
};