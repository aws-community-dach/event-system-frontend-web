import Box from '@/components/Box';
import EventFormModal from '@/components/EventFormModal';
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
  return (
    <div className='grid grid-flow-row-dense lg:grid-cols-3 gap-4 '>
      <div className='col-span-2'>
        <Box className='h-screen border  drop-shadow'>
          <div className='grid gap-2'>
            <h1 className='text-3xl mb-4 font-bold'>{event.name}</h1>
            <div className='mb-12 text-sm text-gray-500'>
              <div>{event.date}</div>
              <div>{event.location}</div>
            </div>
            <div>{event.summary}</div>
            <EventFormModal eventId={params.eventId} />
            {event.agenda && (
              <div>
                <h3 className='text-xl mb-2 mt-12 font-bold'>Agenda</h3>
                <div className='grid gap-2'>
                  {event.agenda.map((agenda) => {
                    return (
                      <div key={agenda.name}>
                        <div>
                          {agenda.start} {agenda.end ? ` - ${agenda.end}` : ''}{' '}
                          | {agenda.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Box>
      </div>

      <div className='hidden lg:block self-start sticky top-2 col-span-1'>
        <EventForm eventId={params.eventId} />
      </div>
    </div>
  );
}
