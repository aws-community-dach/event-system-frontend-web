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
      {events?.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </>
  );
}
