import { EventService } from '@/service/events/EventService';
import { EventType } from '@/types/EventType';

async function getData() {
  const res = await EventService.getAll();

  return res.data;
}

export default async function Page() {
  const event: EventType[] = await getData();
  return <div>{JSON.stringify(event)}</div>;
}
