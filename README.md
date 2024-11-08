# Schema Form Builder

A beautiful, production-ready schema-based form builder for React applications. Create dynamic forms using JSON schemas with built-in validation, conditional fields, and a modern UI.

## Features

- 🎨 Beautiful, production-ready UI with Tailwind CSS
- 📝 Schema-based form generation
- ✨ Built-in validation
- 🔄 Conditional fields
- 📱 Responsive design
- 🎯 TypeScript support
- 🔍 Comprehensive type definitions

## Installation

```bash
npm install @qubbit/dynamic-form
```

## Usage

```tsx
import { SchemaForm, FormSchema, FormData } from '@qubbit/dynamic-form';

const schema: FormSchema = {
  title: "User Profile",
  fields: [
    {
      type: "string",
      name: "firstName",
      label: "First Name",
      required: true
    },
    // ... more fields
  ]
};

function App() {
  const handleSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
  };

  return <SchemaForm schema={schema} onSubmit={handleSubmit} />;
}
```

## Schema Definition

The form schema is a JSON object that defines the structure and validation rules of your form:

```typescript
interface FormSchema {
  title: string;
  fields: FieldSchema[];
}

interface FieldSchema {
  type: 'string' | 'number' | 'boolean' | 'date' | 'enum' | 'array';
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    pattern?: string;
    message?: string;
  };
  options?: Array<{ value: string; label: string }>;
  dependsOn?: {
    field: string;
    value: any;
  };
}
```

## Field Types

- `string`: Text input fields
- `number`: Numeric input fields
- `boolean`: Checkbox fields
- `date`: Date picker fields
- `enum`: Select/dropdown fields
- `array`: Multiple selection fields

## Validation

Built-in validation support includes:

- Required fields
- Min/max values for numbers
- Minimum length for strings
- Pattern matching (regex)
- Custom validation messages
- Array minimum length

## Conditional Fields

Fields can be shown/hidden based on other field values using the `dependsOn` property:

```typescript
{
  type: "string",
  name: "portfolio",
  label: "Portfolio URL",
  dependsOn: {
    field: "isEmployed",
    value: true
  }
}
```

## License

MIT
