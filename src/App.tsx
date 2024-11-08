import React from 'react';
import { SchemaForm } from './components/SchemaForm';
import { userProfileSchema } from './schemas/userProfileSchema';
import { FormData } from './types/schema';

function App() {
  const initialValues: FormData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    age: 30,
    birthDate: new Date('1993-01-01'),
    occupation: 'developer',
    experience: 8,
    isEmployed: true,
    portfolio: 'https://johndoe.dev',
    skills: ['JavaScript', 'TypeScript', 'React']
  };

  const handleSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <SchemaForm 
          schema={userProfileSchema} 
          onSubmit={handleSubmit}
          initialValues={initialValues}
        />
      </div>
    </div>
  );
}

export default App;