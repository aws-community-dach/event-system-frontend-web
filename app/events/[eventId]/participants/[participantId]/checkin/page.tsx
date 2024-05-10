'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ErrorFeedback } from '@/components/Feedback';
import RegistrationQRCode from '@/components/RegistrationQRCode';
import Spinner from '@/components/Spinner';
import { EventService } from '@/service/events/EventService';
import { ParticipantService } from '@/service/events/ParticipantService';
import { EventType } from '@/types/EventType';
import { ParticipantType } from '@/types/ParticipantType';

async function getEvent(eventId: string) {
  try {
    const res = await EventService.get({ id: eventId });
    return res.data;
  } catch (error) {
    return null;
  }
}

async function getParticipant(
  eventId: string,
  participantId: string,
  participantEmail: string,
) {
  try {
    const res = await ParticipantService(eventId).get({
      id: participantId,
      params: { email: participantEmail },
    });
    return res.data;
  } catch (error) {
    return null;
  }
}

export default function Page({
  params,
}: {
  params: { eventId: string; participantId: string };
}) {
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const email = searchParams!.get('email');

  const errorFeedback = (
    <ErrorFeedback title='Ooops, nothing found'>
      <p>Please try again</p>
      <div className='mt-6'>
        <Link href={`/events/${params.eventId}/participants/edit`}>Back</Link>
      </div>
    </ErrorFeedback>
  );

  if (email === null) {
    return errorFeedback;
  }

  const [event, setEvent] = useState<EventType | null>(null);
  const [participant, setParticipant] = useState<ParticipantType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setParticipant(
        await getParticipant(params.eventId, params.participantId, email),
      );

      setEvent(await getEvent(params.eventId));
      setIsLoading(false);
    };

    void fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  if (event === null || participant === null) {
    return errorFeedback;
  }

  return (
    <>
      <h3 className='text-center'>Your checkin code</h3>
      <h2 className='flex justify-center'>{event.name}</h2>
      <div className='my-6 flex justify-center'>
        <RegistrationQRCode eventId={event.id} participantId={participant.id} />
      </div>
      <div className='flex justify-center'>We wish you a happy event!</div>
    </>
  );
}
