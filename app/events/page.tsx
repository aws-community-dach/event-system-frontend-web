import EventsPage from './EventsPage';
import { EventService } from '@/service/events/EventService';
import { EventType } from '@/types/EventType';

async function getData() {
  const res = await EventService.getAll();

  return res.data;
}

export default async function Page() {
  const events: EventType[] = await getData();

  return events && events.length > 0 ? (
    <EventsPage eventList={events} />
  ) : (
    <div>
      <h1>No Events Found</h1>
      <p>
        We could not find any events at the moment. Please check back later.
      </p>
    </div>
  );
}
