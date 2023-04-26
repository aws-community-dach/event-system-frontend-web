'use client';
import EventCard from './EventCard';
import { EventType } from '@/types/EventType';

export default function EventCardList({
  eventList,
  className = '',
}: {
  eventList: EventType[];
  className?: string;
}) {
  return (
    <>
      <div
        className={`mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-3 xl:gap-x-8`}
      >
        {eventList?.map((event) => (
          <EventCard key={event.id} event={event} className={className} />
        ))}
      </div>
    </>
  );
}
