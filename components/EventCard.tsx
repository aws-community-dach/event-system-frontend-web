'use client';
import Link from 'next/link';
import Box from './Box';
import { EventDetails } from './EventDetails';
import EventFormModal from './EventFormModal';
import { EventType } from '@/types/EventType';

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
          <h3>{event.name}</h3>
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
