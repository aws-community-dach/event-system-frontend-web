'use client';
import Link from 'next/link';
import Box from './Box';
import EventFormModal from './EventFormModal';
import { EventType } from '@/types/EventType';
import { formatDate } from '@/app/utils';

export default function EventCard({
  event,
  className = '',
}: {
  event: EventType;
  className?: string;
}) {
  const date = formatDate(event.date, 'date');

  return (
    <Box className={`${className} border  drop-shadow`}>
      <div className='mt-3 sm:mt-0'>
        <Link href={`/events/${event.id}`}>
          <div className='text-2xl'>{event.name}</div>
          <div className='mt-2'>
            <p className='text-sm text-gray-500'>{event.summary}</p>
          </div>
        </Link>
        <EventFormModal eventId={event.id} />

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
