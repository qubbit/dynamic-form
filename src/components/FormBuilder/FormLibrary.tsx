import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { 
  Type, 
  Hash, 
  ToggleLeft, 
  Calendar, 
  List, 
  CheckSquare,
  GripHorizontal
} from 'lucide-react';

const components = [
  { id: 'string', icon: Type, label: 'Text Input' },
  { id: 'number', icon: Hash, label: 'Number Input' },
  { id: 'boolean', icon: ToggleLeft, label: 'Toggle' },
  { id: 'date', icon: Calendar, label: 'Date Picker' },
  { id: 'enum', icon: List, label: 'Dropdown' },
  { id: 'array', icon: CheckSquare, label: 'Multi Select' }
];

interface DraggableComponentProps {
  id: string;
  icon?: typeof Type;
  label?: string;
  isActive?: boolean;
  isOverlay?: boolean;
}

export const DraggableComponent: React.FC<DraggableComponentProps> = ({ 
  id, 
  icon: Icon, 
  label,
  isActive,
  isOverlay
}) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: {
      type: 'COMPONENT'
    }
  });

  const component = components.find(c => c.id === id);
  const DisplayIcon = Icon || component?.icon;
  const displayLabel = label || component?.label;

  if (!DisplayIcon || !displayLabel) return null;

  return (
    <div
      ref={isOverlay ? undefined : setNodeRef}
      {...(!isOverlay ? { ...listeners, ...attributes } : {})}
      className={`flex items-center gap-3 p-3 rounded-lg border ${
        isDragging || isActive || isOverlay
          ? 'bg-blue-50 border-blue-200'
          : 'bg-white border-gray-200 hover:border-blue-200 hover:bg-blue-50'
      } transition-colors ${isOverlay ? 'cursor-grabbing' : 'cursor-grab'}`}
    >
      <GripHorizontal className="w-4 h-4 text-gray-400" />
      <DisplayIcon className="w-4 h-4 text-blue-600" />
      <span className="text-sm font-medium text-gray-700">
        {displayLabel}
      </span>
    </div>
  );
};

interface FormLibraryProps {
  activeId: string | null;
}

export const FormLibrary: React.FC<FormLibraryProps> = ({ activeId }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Components</h2>
      <div className="space-y-2">
        {components.map((component) => (
          <DraggableComponent 
            key={component.id} 
            {...component} 
            isActive={activeId === component.id}
          />
        ))}
      </div>
    </div>
  );
};