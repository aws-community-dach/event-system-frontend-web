'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ParticipantType } from '@/types/ParticipantType';
import { ParticipantService } from '@/service/events/ParticipantService';
import ParticipantFormInputs from './ParticipantFormInputs';
import FormSuccessFeedback from './Feedback';

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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (participantData) {
      setData(participantData);
    }
  }, [participantData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await ParticipantService(eventId).update(participantData.id, data);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      router.push(`/events/${eventId}`);
    }, 3000);
  };

  const handleDelete = async () => {
    await ParticipantService(eventId).delete(participantData.id, {});

    setIsDeleted(true);
    setTimeout(() => {
      setIsDeleted(false);
      router.push(`/events/${eventId}`);
    }, 3000);
  };

  if (isDeleted) {
    return (
      <FormSuccessFeedback>Teilnahme erfolgreich gelöscht</FormSuccessFeedback>
    );
  }

  if (isSubmitted) {
    return (
      <FormSuccessFeedback>Daten erfolgreich aktualisiert</FormSuccessFeedback>
    );
  }

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
