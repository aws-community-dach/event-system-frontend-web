import Box from '@/components/Box';
import EventForm from '@/components/EventsForm';
import { EventService } from '@/service/events/EventService';
import { EventType } from '@/types/EventType';

async function getEvent(eventId: string) {
  const res = await EventService.get(eventId);

  return res.data;
}

export default async function Page({
  params,
}: {
  params: { eventId: string };
}) {
  const event: EventType = await getEvent(params.eventId);
  const date = new Date(event.date).toLocaleDateString('de-DE');
  return (
    <div className='grid grid-flow-row-dense lg:grid-cols-3 gap-4'>
      <div className='col-span-2'>
        <Box>
          <div className='grid gap-4'>
            <h1>{event.name}</h1>
            <div>{date}</div>
            <div>{event.location}</div>
            <div>{event.summary}</div>
            <div>
              {event.agenda.map((agenda) => {
                return (
                  <div key={agenda.name}>
                    <div>
                      {agenda.start} {agenda.end ? ` : ${agenda.end}` : ''} |{' '}
                      {agenda.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Box>
      </div>

      <div className='hidden lg:block self-start sticky top-2 col-span-1'>
        <EventForm eventId={params.eventId} />
      </div>
    </div>
  );
}
