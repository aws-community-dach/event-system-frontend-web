type ButtonType = {
  type?: 'submit' | 'button' | 'reset' | undefined;
  className?: string;
  processing?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
};

export default function Button({
  type = 'submit',
  className = '',
  processing = false,
  onClick,
  children,
  ...rest
}: ButtonType) {
  return (
    <button
      type={type}
      className={
        `border border-primary-500 bg-primary-500 text-white rounded-md px-4 py-2 my-2 transition duration-500 ease select-none hover:bg-primary-600 focus:outline-none focus:shadow-outline ${
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
