export interface FieldSchema {
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

export interface FormSchema {
  title: string;
  fields: FieldSchema[];
}

export interface FormData {
  [key: string]: any;
}

export interface ValidationError {
  field: string;
  message: string;
}