export default function Box({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div className={`px-4 bg-white w-full rounded-lg ${className}`}>
      <div className='pb-4 pt-4 sm:p-6 sm:pb-4'>
        <div className='sm:flex sm:items-start'>{children}</div>
      </div>
    </div>
  );
}
