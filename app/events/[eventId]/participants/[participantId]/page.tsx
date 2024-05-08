'use client';

import Button from '@/components/Button';
import { ErrorFeedback } from '@/components/Feedback';
import ParticipantFormUpdate from '@/components/ParticipantFormUpdate';
import { ParticipantService } from '@/service/events/ParticipantService';
import {
  defaultParticipantObject,
  ParticipantType,
} from '@/types/ParticipantType';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

async function getData(
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
  const searchParams = useSearchParams();
  const email = searchParams!.get('email');

  const errorFeedback = (
    <ErrorFeedback title='Ooops, nothing found!'>
      <p>Please try again</p>
      <div className='mt-6'>
        <Link href={`/events/${params.eventId}/participants/edit`}>Back</Link>
      </div>
    </ErrorFeedback>
  );

  if (email === null) {
    return errorFeedback;
  }

  const [participant, setParticipant] = useState<ParticipantType>({
    ...defaultParticipantObject,
    id: params.participantId,
    email: email,
  });

  useEffect(() => {
    const fetchData = async () => {
      setParticipant(
        await getData(params.eventId, params.participantId, email),
      );
    };

    fetchData();
  }, []);

  if (participant === null) {
    return errorFeedback;
  }

  return (
    <>
      <div className='flex items-center justify-end'>
        <Link
          href={`/events/${params.eventId}/participants/${params.participantId}/checkin`}
        >
          <Button type='button'>Go to Check-In</Button>
        </Link>
      </div>
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
