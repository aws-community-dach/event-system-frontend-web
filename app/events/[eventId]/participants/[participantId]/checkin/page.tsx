import { ErrorFeedback } from '@/components/Feedback';
import RegistrationQRCode from '@/components/RegistrationQRCode';
import { ParticipantService } from '@/service/events/ParticipantService';
import { ParticipantType } from '@/types/ParticipantType';

async function getData(eventId: string, participantId: string) {
  try {
    const res = await ParticipantService(eventId).get(participantId);
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
  const participant: ParticipantType = await getData(
    params.eventId,
    params.participantId,
  );

  if (participant === null) {
    return (
      <>
        <ErrorFeedback title='Participant not found'>
          <p>Nothing found, please try again</p>
          <div className='mt-6'>
            <a href={`/events/${params.eventId}/participants/edit`}>Back</a>
          </div>
        </ErrorFeedback>
      </>
    );
  }

  return (
    <>
      <h1>Your checkin code</h1>
      <div className='my-6 flex justify-center'>
        <RegistrationQRCode
          eventId={params.eventId}
          participantId={participant.id}
        />
      </div>
      <h2>Your badge name</h2>
      <div className='my-6 flex justify-center'>{participant.displayName}</div>
    </>
  );
}
