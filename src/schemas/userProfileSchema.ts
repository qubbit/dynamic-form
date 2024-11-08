import { FormSchema } from '../types/schema';

export const userProfileSchema: FormSchema = {
  title: "Professional Profile",
  fields: [
    {
      type: "string",
      name: "firstName",
      label: "First Name",
      required: true,
      placeholder: "John",
      validation: {
        minLength: 2,
        message: "First name must be at least 2 characters"
      }
    },
    {
      type: "string",
      name: "lastName",
      label: "Last Name",
      required: true,
      placeholder: "Doe",
      validation: {
        minLength: 2,
        message: "Last name must be at least 2 characters"
      }
    },
    {
      type: "string",
      name: "email",
      label: "Email",
      required: true,
      placeholder: "john.doe@example.com",
      validation: {
        pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
        message: "Please enter a valid email address"
      }
    },
    {
      type: "number",
      name: "age",
      label: "Age",
      required: true,
      placeholder: "25",
      validation: {
        min: 18,
        max: 100,
        message: "Age must be between 18 and 100"
      }
    },
    {
      type: "date",
      name: "birthDate",
      label: "Birth Date",
      required: true
    },
    {
      type: "enum",
      name: "occupation",
      label: "Occupation",
      required: true,
      options: [
        { value: "developer", label: "Developer" },
        { value: "designer", label: "Designer" },
        { value: "manager", label: "Manager" },
        { value: "other", label: "Other" }
      ]
    },
    {
      type: "number",
      name: "experience",
      label: "Years of Experience",
      required: true,
      placeholder: "5",
      validation: {
        min: 0,
        max: 50,
        message: "Experience must be between 0 and 50 years"
      }
    },
    {
      type: "boolean",
      name: "isEmployed",
      label: "Currently Employed",
      required: true
    },
    {
      type: "string",
      name: "portfolio",
      label: "Portfolio URL",
      placeholder: "https://your-portfolio.com",
      dependsOn: {
        field: "isEmployed",
        value: true
      },
      validation: {
        pattern: "^https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+[/#?]?.*$",
        message: "Please enter a valid URL"
      }
    },
    {
      type: "array",
      name: "skills",
      label: "Skills",
      required: true,
      options: [
        { value: "JavaScript", label: "JavaScript" },
        { value: "TypeScript", label: "TypeScript" },
        { value: "React", label: "React" },
        { value: "Node.js", label: "Node.js" },
        { value: "Python", label: "Python" },
        { value: "UI/UX Design", label: "UI/UX Design" },
        { value: "Project Management", label: "Project Management" }
      ],
      validation: {
        min: 1,
        message: "Please select at least one skill"
      }
    }
  ]
};