import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AlertCircle } from 'lucide-react';
import { FieldSchema } from '../types/schema';
import { MultiSelect } from './MultiSelect';
import { DynamicFields } from './DynamicFields';

interface FieldProps {
  field: FieldSchema;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}

const FormField: React.FC<FieldProps> = ({ field, value, onChange, error }) => {
  const renderField = () => {
    switch (field.type) {
      case 'string':
        if (field.multiple) {
          return (
            <DynamicFields
              values={value || []}
              onChange={onChange}
              placeholder={field.placeholder}
            />
          );
        }
        return (
          <input
            type={field.name === 'email' ? 'email' : field.name === 'portfolio' ? 'url' : 'text'}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(Number(e.target.value))}
            placeholder={field.placeholder}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        );

      case 'boolean':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => onChange(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-600">Yes</span>
          </div>
        );

      case 'date':
        return (
          <DatePicker
            selected={value ? new Date(value) : null}
            onChange={(date) => onChange(date)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            dateFormat="yyyy-MM-dd"
          />
        );

      case 'enum':
        return (
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'array':
        if (field.options && field.options.length > 8) {
          return (
            <MultiSelect
              options={field.options}
              value={value || []}
              onChange={onChange}
              placeholder={`Select ${field.label}`}
            />
          );
        }
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {field.options?.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={(value || []).includes(option.value)}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...(value || []), option.value]
                      : (value || []).filter((v: string) => v !== option.value);
                    onChange(newValue);
                  }}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-600">{option.label}</span>
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      <label className="block font-medium text-gray-700 mb-1">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderField()}
      {error && (
        <div className="mt-1 text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FormField;
