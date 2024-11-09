import React, { useState, useEffect } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FormSchema } from '../../types/schema';

SyntaxHighlighter.registerLanguage('json', json);

interface SchemaPreviewProps {
  schema: FormSchema;
  onChange: (schema: FormSchema) => void;
}

export const SchemaPreview: React.FC<SchemaPreviewProps> = ({ schema, onChange }) => {
  const [editableSchema, setEditableSchema] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setEditableSchema(JSON.stringify(schema, null, 2));
  }, [schema]);

  const handleSchemaChange = (value: string) => {
    setEditableSchema(value);
    try {
      const parsed = JSON.parse(value);
      if (!parsed.title || !Array.isArray(parsed.fields)) {
        throw new Error('Invalid schema structure');
      }
      setError(null);
      onChange(parsed);
    } catch (err) {
      setError('Invalid JSON schema');
    }
  };

  return (
    <div className="relative">
      {error && (
        <div className="absolute top-2 right-2 px-4 py-2 bg-red-100 text-red-800 rounded-md text-sm">
          {error}
        </div>
      )}
      <div className="relative font-mono text-sm">
        <textarea
          value={editableSchema}
          onChange={(e) => handleSchemaChange(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 z-10 resize-none p-4"
          spellCheck="false"
        />
        <SyntaxHighlighter
          language="json"
          style={vs2015}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: '#1E1E1E',
            borderRadius: '0.5rem',
            minHeight: '400px'
          }}
        >
          {editableSchema}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
