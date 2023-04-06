'use client';
import { EventType } from '@/types/EventType';
import Link from 'next/link';
import Button from './Button';
import Box from './Box';

export default function EventCard({ event }: { event: EventType }) {
  const date = new Date(event.date).toLocaleDateString('de-DE');

  return (
    <Box className=''>
      <div className='mt-3 sm:mt-0'>
        <div className=' text-2xl '>{event.name}</div>
        <div className='mt-2'>
          <p className='text-sm text-gray-500'>{event.summary}</p>
        </div>
        <div className='my-6'>
          <Link href={`/events/${event.id}`}>Mehr erfahren</Link>
        </div>
        <Button className='w-full'>Registrieren</Button>

        <div className='py-3 sm:flex text-gray-500'>
          <div className='flex flex-col'>
            <div>{date}</div>
            <div>{event.location}</div>
          </div>
        </div>
      </div>
    </Box>
  );
}
