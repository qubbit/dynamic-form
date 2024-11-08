import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { FormSchema, FormData, ValidationError } from '../types/schema';
import { validateForm } from '../utils/validation';
import FormField from './FormFields';

interface SchemaFormProps {
  schema: FormSchema;
  onSubmit: (data: FormData) => void;
}

export const SchemaForm: React.FC<SchemaFormProps> = ({ schema, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<ValidationError[]>([]);

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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{schema.title}</h1>

      <div className="space-y-4">
        {schema.fields.map((field) => (
          shouldShowField(field) && (
            <FormField
              key={field.name}
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
        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2 transition-colors"
      >
        <Save className="w-4 h-4" />
        Save Profile
      </button>
    </form>
  );
};