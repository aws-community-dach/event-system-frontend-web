import { ErrorFeedback } from '@/components/Feedback';
import ParticipantFormUpdate from '@/components/ParticipantFormUpdate';
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
      <a
        href={`/events/${params.eventId}/participants/${params.participantId}/checkin`}
      >
        Go to Check-In
      </a>
      <br />
      <h1>Update your Registration</h1>
      <>
        <ParticipantFormUpdate
          eventId={params.eventId}
          participantData={participant}
        />
      </>
    </>
  );
}
