import EventsPage from './EventsPage';
import { EventService } from '@/service/events/EventService';
import { EventType } from '@/types/EventType';

async function getData() {
  const res = await EventService.getAll();

  return res.data;
}

export default async function Page() {
  const events: EventType[] = await getData();

  return <EventsPage eventList={events} />;
}
