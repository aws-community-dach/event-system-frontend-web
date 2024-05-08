import { ErrorFeedback } from '@/components/Feedback';
import RegistrationQRCode from '@/components/RegistrationQRCode';
import { EventService } from '@/service/events/EventService';
import { EventType } from '@/types/EventType';

async function getEvent(eventId: string) {
  try {
    const res = await EventService.get({ id: eventId });
    return res.data;
  } catch (error) {
    return null;
  }
}

export default async function Page({
  params,
}: {
  params: { eventId: string; participantId: string };
}) {
  const event: EventType = await getEvent(params.eventId);

  if (event === null) {
    return (
      <>
        <ErrorFeedback title='Event not found'>
          <p>Nothing found, please try again</p>
          <div className='mt-6'>
            <a href='/events'>Back</a>
          </div>
        </ErrorFeedback>
      </>
    );
  }

  return (
    <>
      <h3 className='text-center'>Your checkin code</h3>
      <h2 className='flex justify-center'>{event.name}</h2>
      <div className='my-6 flex justify-center'>
        <RegistrationQRCode
          eventId={params.eventId}
          participantId={params.participantId}
        />
      </div>
      <div className='flex justify-center'>We wish you a happy event!</div>
    </>
  );
}
