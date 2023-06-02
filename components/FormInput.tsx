// FormInput.tsx
import React from 'react';

type FormInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
};

export default function FormInput({
  label,
  id,
  name,
  type,
  placeholder,
  required,
  ...props
}: FormInputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
          {label}
        </label>
      )}
      <div className='mt-2'>
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className='pl-2 py-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6'
          {...props}
        />
      </div>
    </div>
  );
}
