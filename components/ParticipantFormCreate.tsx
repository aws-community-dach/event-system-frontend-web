'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ParticipantType } from '@/types/ParticipantType';
import { ParticipantService } from '@/service/events/ParticipantService';
import ParticipantFormInputs from './ParticipantFormInputs';

export default function ParticipantFormCreate({
  eventId,
  className = '',
}: {
  eventId: string;
  className?: string;
}) {
  const router = useRouter();
  const [data, setData] = useState<ParticipantType>({
    id: 0,
    name: '',
    displayName: '',
    email: '',
    customData: {
      tShirtSize: 'm',
      eventParticipation: false,
      foodPreference: 'Meat',
      jobDescription: '',
      companyName: '',
      awsExperience: '< 1 year',
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await ParticipantService(eventId).add('', data);
    router.push(`/events/${eventId}`);
  };

  return (
    <div className={className}>
      <ParticipantFormInputs
        participantData={data}
        handleDataChange={setData}
        handleSubmit={handleSubmit}
        isNewParticipant={true}
        eventId={eventId}
      />
    </div>
  );
}
