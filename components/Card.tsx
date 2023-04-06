export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className='px-4 bg-white min-h-80 w-full rounded-lg'>
      <div className='pb-4 pt-5 sm:p-6 sm:pb-4'>
        <div className='sm:flex sm:items-start'>{children}</div>
      </div>
    </div>
  );
}
