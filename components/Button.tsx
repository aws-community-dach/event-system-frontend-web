type ButtonType = {
  type?: 'submit' | 'button' | 'reset' | undefined;
  color?: string;
  className?: string;
  processing?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
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
  return (
    <button
      type={type}
      className={
        `border border-${color} bg-${color} text-white rounded-md px-4 py-2 my-2 transition duration ease select-none hover:bg-${color} focus:outline-none focus:shadow-outline ${
          processing && 'opacity-25'
        } ` + className
      }
      onClick={onClick}
      disabled={processing}
      {...rest}
    >
      {children}
    </button>
  );
}
