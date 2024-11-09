import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormSchema, FieldSchema } from '../../types/schema';
import { FieldEditor } from './FieldEditor';
import { GripHorizontal, Trash2, ArrowDown } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';

interface FormPreviewProps {
  schema: FormSchema;
  onRemoveField: (index: number) => void;
  onUpdateField: (index: number, field: FieldSchema) => void;
  isDraggingNew: boolean;
}

const SortableField = ({ field, index, onRemove, onUpdate }: {
  field: FieldSchema;
  index: number;
  onRemove: () => void;
  onUpdate: (field: FieldSchema) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: `${field.name}_${field.type}`
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative border rounded-lg p-4 ${
        isDragging
          ? 'bg-blue-50 border-blue-200 opacity-50'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          {...attributes}
          {...listeners}
          className="mt-2 cursor-grab"
        >
          <GripHorizontal className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="flex-1">
          <FieldEditor
            field={field}
            onChange={onUpdate}
          />
        </div>
        
        <button
          onClick={onRemove}
          className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export const FormPreview: React.FC<FormPreviewProps> = ({
  schema,
  onRemoveField,
  onUpdateField,
  isDraggingNew
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'form-preview-drop-area'
  });

  if (schema.fields.length === 0) {
    return (
      <div
        ref={setNodeRef}
        className={`text-center py-12 border-2 border-dashed rounded-lg transition-colors ${
          isOver || isDraggingNew
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300'
        }`}
      >
        {isDraggingNew ? (
          <div className="flex flex-col items-center text-blue-600">
            <ArrowDown className="w-8 h-8 mb-2 animate-bounce" />
            <p>Drop component here</p>
          </div>
        ) : (
          <p className="text-gray-500">
            Drag and drop components here to build your form
          </p>
        )}
      </div>
    );
  }

  return (
    <div ref={setNodeRef} className="space-y-4">
      {schema.fields.map((field, index) => (
        <SortableField
          key={`${field.name}_${field.type}`}
          field={field}
          index={index}
          onRemove={() => onRemoveField(index)}
          onUpdate={(updatedField) => onUpdateField(index, updatedField)}
        />
      ))}
      {(isOver || isDraggingNew) && (
        <div className="border-2 border-dashed border-blue-400 rounded-lg p-4 bg-blue-50">
          <div className="flex justify-center text-blue-600">
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </div>
        </div>
      )}
    </div>
  );
};