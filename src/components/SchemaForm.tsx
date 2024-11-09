import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { FormSchema, FormData, ValidationError } from '../types/schema';
import { validateForm } from '../utils/validation';
import FormField from './FormFields';

interface SchemaFormProps {
  schema: FormSchema;
  onSubmit: (data: FormData) => void;
  initialValues?: FormData;
  className?: string;
}

// Use this for rendering for the form as a card
const CARD_CLASSNAME = "max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg";

export const SchemaForm: React.FC<SchemaFormProps> = ({ className, schema, onSubmit, initialValues = {} }) => {
  const [formData, setFormData] = useState<FormData>(initialValues);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(schema.fields, formData);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    onSubmit(formData);
  };

  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is modified
    setErrors(prev => prev.filter(error => error.field !== name));
  };

  const getFieldError = (fieldName: string) => {
    const error = errors.find(e => e.field === fieldName);
    return error?.message;
  };

  const shouldShowField = (field: FormSchema['fields'][0]) => {
    if (!field.dependsOn) return true;
    return formData[field.dependsOn.field] === field.dependsOn.value;
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {schema.title && <h1 className="text-3xl font-bold text-gray-800 mb-6">{schema.title}</h1>}

      <div className="space-y-4">
        {schema.fields.map((field, index) => (
          shouldShowField(field) && (
            <FormField
              key={`dynamic-form-field-${field.name}-${index}`}
              field={field}
              value={formData[field.name]}
              onChange={(value) => handleFieldChange(field.name, value)}
              error={getFieldError(field.name)}
            />
          )
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2 transition-colors"
      >
        <Save className="w-4 h-4" /> Save
      </button>
    </form>
  );
};
