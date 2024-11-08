import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface DynamicFieldsProps {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export const DynamicFields: React.FC<DynamicFieldsProps> = ({
  values = [],
  onChange,
  placeholder = 'Enter value...'
}) => {
  const handleAdd = () => {
    onChange([...values, '']);
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = value;
    onChange(newValues);
  };

  return (
    <div className="space-y-2">
      {values.map((value, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="p-2 text-red-600 hover:text-red-800 rounded-md hover:bg-red-50"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 rounded-md hover:bg-blue-50"
      >
        <Plus className="w-4 h-4" />
        Add Field
      </button>
    </div>
  );
};
