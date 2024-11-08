import React from 'react';
import { X } from 'lucide-react';

interface MultiSelectProps {
  options: Array<{ value: string; label: string }>;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value = [],
  onChange,
  placeholder = 'Select options...'
}) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    if (!value.includes(selectedOption)) {
      onChange([...value, selectedOption]);
    }
    e.target.value = ''; // Reset select after selection
  };

  const removeOption = (optionToRemove: string) => {
    onChange(value.filter(v => v !== optionToRemove));
  };

  return (
    <div className="space-y-2">
      <select
        onChange={handleSelectChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option 
            key={option.value} 
            value={option.value}
            disabled={value.includes(option.value)}
          >
            {option.label}
          </option>
        ))}
      </select>
      
      <div className="flex flex-wrap gap-2">
        {value.map(selectedValue => {
          const option = options.find(opt => opt.value === selectedValue);
          return (
            <span
              key={selectedValue}
              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md"
            >
              {option?.label}
              <button
                type="button"
                onClick={() => removeOption(selectedValue)}
                className="text-blue-600 hover:text-blue-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
};
