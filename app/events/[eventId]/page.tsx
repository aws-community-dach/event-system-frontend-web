import { CalendarIcon, ClockIcon, MapIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@/app/utils';
import Box from '@/components/Box';
import { EventAgenda } from '@/components/EventAgenda';
import EventFormModal from '@/components/EventFormModal';
import { H1, H2 } from '@/components/Headlines';
import { IconWithText } from '@/components/IconWithText';
import ParticipantFormCreate from '@/components/ParticipantFormCreate';
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
  const eventDate = formatDate(event.date, 'date');
  const eventTime = formatDate(event.date, 'time');
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='mb-auto'>
        <div className='grid grid-flow-row-dense lg:grid-cols-3 gap-4'>
          <div className='col-span-2'>
            <Box>
              <div className='grid gap-2'>
                <H1>{event.name}</H1>
                <div className='mb-12 text-gray-500 flex flex-col space-y-2'>
                  <IconWithText Icon={CalendarIcon}>{eventDate}</IconWithText>
                  <IconWithText Icon={ClockIcon}>{eventTime}</IconWithText>
                  <IconWithText Icon={MapIcon}>{event.location}</IconWithText>
                </div>
                <H2>Über das Event</H2>
                <div>{event.summary}</div>

                {event.agenda && (
                  <div>
                    <H2>Agenda</H2>
                    <EventAgenda agendaList={event.agenda} />
                  </div>
                )}
              </div>
            </Box>
          </div>

          <div className='hidden lg:block self-start sticky top-2 col-span-1'>
            <Box className='border drop-shadow'>
              <ParticipantFormCreate
                eventId={params.eventId}
                className='w-full'
              />
            </Box>
          </div>
        </div>
      </div>
      <div className='lg:hidden bg-white py-4 px-8 sticky inset-x-0 bottom-0 left-0'>
        <EventFormModal eventId={params.eventId} />
      </div>
    </div>
  );
}
