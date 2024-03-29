import EventCardList from '@/components/EventCardList';
import { EventService } from '@/service/events/EventService';
import { EventType } from '@/types/EventType';

async function getData() {
  const res = await EventService.getAll();

  return res.data;
}

export default async function Home() {
  const events: EventType[] = await getData();
  return <EventCardList eventList={events} />;
}
