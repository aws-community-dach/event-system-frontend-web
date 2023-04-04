'use client';
import { EventType } from '@/types/EventType';
import Link from 'next/link';
import Button from './Button';

export default function EventCard({ event }: { event: EventType }) {
  return (
    <div className='min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75'>
      <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
        <div className='sm:flex sm:items-start'>
          <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
            {event.name}
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>{event.summary}</p>
            </div>
            <div>
              <Link href={`/events/${event.id}`}>Mehr erfahren</Link>
            </div>
            <Button>Registrieren</Button>
          </div>
        </div>
      </div>

      <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
        <div>{event.date}</div>
        <div>{event.location}</div>
      </div>
    </div>
  );
}
