type ButtonType = {
  type?: 'submit' | 'button' | 'reset' | undefined;
  color?: 'accent' | 'secondary' | 'info' | 'danger' | 'success' | undefined;
  className?: string;
  processing?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
};

const colorClasses = {
  accent: 'text-dark border-accent bg-accent hover:bg-accent-dark',
  secondary: 'text-dark border-gray-300 bg-gray-200 hover:bg-gray-300',
  info: 'text-white border-info bg-info hover:bg-info-600',
  danger: 'text-white border-danger bg-danger hover:bg-danger-600',
  success: 'text-white border-success bg-success hover:bg-success-600',
};

export default function Button({
  type = 'submit',
  className = '',
  color = 'accent',
  processing = false,
  onClick,
  children,
  ...rest
}: ButtonType) {
  const colorClass = colorClasses[color] || colorClasses['accent'];

  return (
    <button
      type={type}
      className={`rounded-md px-4 py-2 my-2 transition duration ease select-none focus:outline-none focus:shadow-outline ${
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
