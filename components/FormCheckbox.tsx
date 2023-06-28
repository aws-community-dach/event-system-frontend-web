type FormCheckboxProps = {
  label?: string;
  id?: string;
  name?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function FormCheckbox({
  label,
  id,
  name,
  checked,
  onChange,
}: FormCheckboxProps) {
  return (
    <div className='mt-2'>
      <input
        type='checkbox'
        id={id}
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className='w-4 h-4'
      />
      {label && (
        <label htmlFor={id} className='ml-2 text-sm font-medium text-gray-700'>
          {label}
        </label>
      )}
    </div>
  );
}
