import { EventType } from '@/types/EventType';

async function getData(eventId: string) {
  const res = await fetch(
    `http://localhost:3000/api/samples/events/${eventId}`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Page({
  params,
}: {
  params: { eventId: string };
}) {
  const event: EventType = await getData(params.eventId);
  return <div>{JSON.stringify(event)}</div>;
}
