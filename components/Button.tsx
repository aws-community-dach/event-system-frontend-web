type ButtonType = {
  type?: 'submit' | 'button' | 'reset' | undefined;
  color?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'warning'
    | 'success'
    | undefined;
  className?: string;
  processing?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
};

const colorClasses = {
  primary: 'border-primary bg-primary hover:bg-primary-dark',
  secondary: 'border-secondary bg-secondary hover:bg-secondary-dark',
  danger: 'border-danger bg-danger hover:bg-danger-dark',
  warning: 'border-warning bg-warning hover:bg-warning-dark',
  success: 'border-success bg-success hover:bg-success-dark',
};

export default function Button({
  type = 'submit',
  className = '',
  color = 'primary',
  processing = false,
  onClick,
  children,
  ...rest
}: ButtonType) {
  const colorClass = colorClasses[color] || colorClasses['primary'];

  return (
    <button
      type={type}
      className={`text-white rounded-md px-4 py-2 my-2 transition duration ease select-none focus:outline-none focus:shadow-outline ${
        processing ? 'opacity-25' : ''
      } ${colorClass} ${className}`}
      onClick={onClick}
      disabled={processing}
      {...rest}
    >
      {children}
    </button>
  );
}
