import React, { useState } from 'react';
import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor, DragStartEvent, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { FormLibrary } from './FormLibrary';
import { FormPreview } from './FormPreview';
import { SchemaPreview } from './SchemaPreview';
import { FormSchema, FieldSchema } from '../../types/schema';
import { Layers, Code } from 'lucide-react';
import { DraggableComponent } from './FormLibrary';
import { SchemaForm } from '../SchemaForm';

const initialSchema: FormSchema = {
  title: "New Form",
  fields: []
};

export const FormBuilder: React.FC = () => {
  const [schema, setSchema] = useState<FormSchema>(initialSchema);
  const [activeTab, setActiveTab] = useState<'builder' | 'preview' | 'schema'>('preview');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDraggingNew, setIsDraggingNew] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
    setIsDraggingNew(active.data.current?.type === 'COMPONENT');
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setIsDraggingNew(false);
    
    if (!over) return;

    if (active.data.current?.type === 'COMPONENT') {
      const fieldType = active.id as string;
      const newField = createField(fieldType, schema.fields.length);
      
      setSchema(prev => ({
        ...prev,
        fields: [...prev.fields, newField]
      }));
    } else {
      const oldIndex = schema.fields.findIndex(field => `${field.name}_${field.type}` === active.id);
      const newIndex = schema.fields.findIndex(field => `${field.name}_${field.type}` === over.id);

      if (oldIndex !== newIndex) {
        setSchema(prev => ({
          ...prev,
          fields: arrayMove(prev.fields, oldIndex, newIndex)
        }));
      }
    }
  };

  const handleSchemaChange = (newSchema: FormSchema) => {
    try {
      if (typeof newSchema !== 'object' || !Array.isArray(newSchema.fields)) {
        throw new Error('Invalid schema structure');
      }

      newSchema.fields.forEach(field => {
        if (!field.type || !field.name || !field.label) {
          throw new Error('Invalid field structure');
        }
      });

      setSchema(newSchema);
    } catch (error) {
      console.error('Invalid schema:', error);
    }
  };

  const handleRemoveField = (index: number) => {
    const newFields = [...schema.fields];
    newFields.splice(index, 1);
    setSchema({
      ...schema,
      fields: newFields
    });
  };

  const handleUpdateField = (index: number, field: FieldSchema) => {
    const newFields = [...schema.fields];
    newFields[index] = field;
    setSchema({
      ...schema,
      fields: newFields
    });
  };

  return (
    <DndContext 
      sensors={sensors} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Form Builder</h1>
          
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <FormLibrary activeId={activeId} />
            </div>
            
            <div className="col-span-9">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="border-b border-gray-200">
                  <div className="flex">
                    <button
                      className={`px-6 py-3 flex items-center gap-2 ${
                        activeTab === 'builder'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveTab('builder')}
                    >
                      <Layers className="w-4 h-4" />
                      Builder
                    </button>
                    <button
                      className={`px-6 py-3 flex items-center gap-2 ${
                        activeTab === 'preview'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveTab('preview')}
                    >
                      <Layers className="w-4 h-4" />
                      Preview
                    </button>
                    <button
                      className={`px-6 py-3 flex items-center gap-2 ${
                        activeTab === 'schema'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveTab('schema')}
                    >
                      <Code className="w-4 h-4" />
                      Schema
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  {activeTab === 'builder' && 
                    <SortableContext 
                      items={schema.fields.map(field => `${field.name}_${field.type}`)}
                      strategy={verticalListSortingStrategy}
                    >
                      <FormPreview
                        schema={schema}
                        onRemoveField={handleRemoveField}
                        onUpdateField={handleUpdateField}
                        isDraggingNew={isDraggingNew}
                      />
                    </SortableContext>
                  }
                  {activeTab === 'preview' && 
                    <SchemaForm
                      schema={schema}
                    />
                  }
                  {activeTab === 'schema' && 
                    <SchemaPreview
                      schema={schema}
                      onChange={handleSchemaChange}
                    />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeId && (
          <div className="bg-white shadow-lg rounded-lg border border-blue-200 p-4 opacity-90">
            <DraggableComponent
              id={activeId}
              isOverlay
            />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

function createField(type: string, index: number): FieldSchema {
  const baseField = {
    type: type as FieldSchema['type'],
    name: `field_${index}`,
    label: `Field ${index + 1}`,
    required: false
  };

  switch (type) {
    case 'string':
      return {
        ...baseField,
        placeholder: 'Enter text...'
      };
    case 'number':
      return {
        ...baseField,
        placeholder: 'Enter number...',
        validation: {
          min: 0
        }
      };
    case 'enum':
      return {
        ...baseField,
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]
      };
    case 'array':
      return {
        ...baseField,
        options: [
          { value: 'choice1', label: 'Choice 1' },
          { value: 'choice2', label: 'Choice 2' }
        ]
      };
    default:
      return baseField;
  }
}
