import EventCard from '@/components/EventCard';
import { EventService } from '@/service/events/EventService';
import { EventType } from '@/types/EventType';

async function getData() {
  const res = await EventService.getAll();

  return res.data;
}

export default async function Home() {
  const events: EventType[] = await getData();
  return (
    <>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-3 xl:gap-x-8'>
          {events?.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </>
  );
}
