import React from 'react';

// prettier-ignore
type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
// prettier-ignore
type SelectProps = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

type FormInputProps = InputProps &
  SelectProps & { as?: 'input' | 'select'; label?: string };

export default function FormInput({
  as = 'input',
  label,
  id,
  name,
  placeholder,
  required,
  children,
  className = '',
  ...props
}: FormInputProps) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className='block tracking-wide text-gray-700 text-xs font-bold mb-2'
        >
          {label}
        </label>
      )}
      <div className='mt-2'>
        {as === 'input' ? (
          <input
            id={id}
            name={name}
            placeholder={placeholder}
            required={required}
            className='pl-2 py-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent-600 sm:text-sm sm:leading-6'
            {...props}
          />
        ) : (
          <select
            id={id}
            name={name}
            required={required}
            className='pl-2 py-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent-600 sm:text-sm sm:leading-6'
            {...props}
          >
            {children}
          </select>
        )}
      </div>
    </div>
  );
}
