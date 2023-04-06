'use client';
import { EventType } from '@/types/EventType';
import Link from 'next/link';
import Button from './Button';

export default function EventCard({ event }: { event: EventType }) {
  const date = new Date(event.date).toLocaleDateString('de-DE');

  return (
    <div className='px-4 bg-white min-h-80 w-full rounded-lg'>
      <div className='pb-4 pt-5 sm:p-6 sm:pb-4'>
        <div className='sm:flex sm:items-start'>
          <div className='mt-3 sm:mt-0'>
            <div className=' text-2xl '>{event.name}</div>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>{event.summary}</p>
            </div>
            <div className='my-6'>
              <Link href={`/events/${event.id}`}>Mehr erfahren</Link>
            </div>
            <Button className='w-full'>Registrieren</Button>
          </div>
        </div>
        <div className='py-3 sm:flex text-gray-500'>
          <div className='flex flex-col'>
            <div>{date}</div>
            <div>{event.location}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
