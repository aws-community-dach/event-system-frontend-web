'use client';
import Link from 'next/link';
import Box from './Box';
import { EventType } from '@/types/EventType';
import { EventDetails } from './EventDetails';
import EventFormModal from './EventFormModal';

export default function EventCard({
  event,
  className = '',
}: {
  event: EventType;
  className?: string;
}) {
  return (
    <Box className={`${className} border drop-shadow`}>
      <div className='mt-3 sm:mt-0 grow pr-4'>
        <Link href={`/events/${event.id}`}>
          <div className='text-2xl'>{event.name}</div>
          <div className='mt-2'>
            <p className='text-sm text-gray-500'>{event.summary}</p>
          </div>
        </Link>
      </div>
      <div className='basis-1/3'>
        <EventDetails date={event.date} location={event.location} />
        <EventFormModal eventId={event.id} />
      </div>
    </Box>
  );
}
