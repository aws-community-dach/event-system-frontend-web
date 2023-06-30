import { ErrorFeedback } from '@/components/Feedback';
import ParticipantFormUpdate from '@/components/ParticipantFormUpdate';
import { ParticipantService } from '@/service/events/ParticipantService';
import { ParticipantType } from '@/types/ParticipantType';

async function getData(eventId: string, participantId: string, token: string) {
  try {
    const res = await ParticipantService(eventId).get(
      `${participantId}?token=${token}`,
    );
    return res.data;
  } catch (error) {
    return null;
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { eventId: string; participantId: string };
  searchParams: { token: string };
}) {
  const token = searchParams.token;

  if (!token) {
    return <ErrorFeedback title='No Token'>No token provided</ErrorFeedback>;
  }

  const participant: ParticipantType = await getData(
    params.eventId,
    params.participantId,
    token,
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
