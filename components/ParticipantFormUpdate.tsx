'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ParticipantType } from '@/types/ParticipantType';
import { ParticipantService } from '@/service/events/ParticipantService';
import ParticipantFormInputs from './ParticipantFormInputs';

export default function ParticipantFormUpdate({
  eventId,
  participantData,
  className = '',
}: {
  eventId: string;
  className?: string;
  participantData: ParticipantType;
}) {
  const router = useRouter();
  const [data, setData] = useState<ParticipantType>(participantData);

  useEffect(() => {
    if (participantData) {
      setData(participantData);
    }
  }, [participantData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await ParticipantService(eventId).update(participantData.id, data);
    router.push(`/events/${eventId}`);
  };

  const handleDelete = async () => {
    await ParticipantService(eventId).delete(participantData.id, {});
    router.push(`/events/${eventId}`);
  };

  return (
    <div className={className}>
      <ParticipantFormInputs
        participantData={data}
        handleDataChange={setData}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        eventId={eventId}
      />
    </div>
  );
}
