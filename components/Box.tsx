export default function Box({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white w-full rounded-lg ${className}`}>
      <div className='pb-4 p-4 sm:pb-4'>
        <div className='sm:flex sm:items-start'>{children}</div>
      </div>
    </div>
  );
}
