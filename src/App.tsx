import React from 'react';
import { SchemaForm } from './components/SchemaForm';
import { userProfileSchema } from './schemas/userProfileSchema';
import { FormData } from './types/schema';

function App() {
  const handleSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <SchemaForm schema={userProfileSchema} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default App;