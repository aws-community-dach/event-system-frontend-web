import RegistrationQRCode from '@/components/RegistrationQRCode';
import { EventService } from '@/service/events/EventService';
import { EventType } from '@/types/EventType';

async function getEvent(eventId: string) {
  const res = await EventService.get(eventId);

  return res.data;
}

export default async function Page({
  params,
}: {
  params: { eventId: string; participantId: string };
}) {
  const event: EventType = await getEvent(params.eventId);

  return (
    <>
      <h1 className='text-center'>Your checkin code</h1>
      <div className='my-6 flex justify-center'>
        <RegistrationQRCode
          eventId={params.eventId}
          participantId={params.participantId}
        />
      </div>
      <h3 className='flex justify-center'>{event.name}</h3>
    </>
  );
}
