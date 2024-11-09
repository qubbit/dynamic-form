import React from 'react';
import { FieldSchema } from '../../types/schema';
import { Plus, X } from 'lucide-react';

interface FieldEditorProps {
  field: FieldSchema;
  onChange: (field: FieldSchema) => void;
}

export const FieldEditor: React.FC<FieldEditorProps> = ({ field, onChange }) => {
  const handleChange = (
    key: keyof FieldSchema,
    value: any
  ) => {
    onChange({ ...field, [key]: value });
  };

  const handleOptionChange = (index: number, key: 'value' | 'label', value: string) => {
    if (!field.options) return;
    
    const newOptions = [...field.options];
    newOptions[index] = { ...newOptions[index], [key]: value };
    onChange({ ...field, options: newOptions });
  };

  const addOption = () => {
    if (!field.options) return;
    
    const newOptions = [
      ...field.options,
      { value: `option${field.options.length + 1}`, label: `Option ${field.options.length + 1}` }
    ];
    onChange({ ...field, options: newOptions });
  };

  const removeOption = (index: number) => {
    if (!field.options) return;
    
    const newOptions = field.options.filter((_, i) => i !== index);
    onChange({ ...field, options: newOptions });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Label
          </label>
          <input
            type="text"
            value={field.label}
            onChange={(e) => handleChange('label', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Field Name
          </label>
          <input
            type="text"
            value={field.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {field.type === 'string' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Placeholder
          </label>
          <input
            type="text"
            value={field.placeholder || ''}
            onChange={(e) => handleChange('placeholder', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {(field.type === 'enum' || field.type === 'array') && field.options && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Options
          </label>
          
          {field.options.map((option, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={option.value}
                onChange={(e) => handleOptionChange(index, 'value', e.target.value)}
                placeholder="Value"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={option.label}
                onChange={(e) => handleOptionChange(index, 'label', e.target.value)}
                placeholder="Label"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => removeOption(index)}
                className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
          
          <button
            onClick={addOption}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800 rounded-md hover:bg-blue-50"
          >
            <Plus className="w-4 h-4" />
            Add Option
          </button>
        </div>
      )}

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={field.required || false}
            onChange={(e) => handleChange('required', e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Required</span>
        </label>
      </div>
    </div>
  );
};