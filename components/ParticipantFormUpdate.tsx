'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import FormSuccessFeedback from './Feedback';
import ParticipantFormInputs from './ParticipantFormInputs';
import { ParticipantService } from '@/service/events/ParticipantService';
import { ParticipantType } from '@/types/ParticipantType';

export default function ParticipantFormUpdate({
  eventId,
  participantData,
  token,
  className = '',
}: {
  eventId: string;
  className?: string;
  participantData: ParticipantType;
  token: string;
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
    await ParticipantService(eventId).update(`${participantData.id}?token=${token}`, data);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      router.push(`/events/${eventId}`);
    }, 3000);
  };

  const handleDelete = async () => {
    await ParticipantService(eventId).delete(`${participantData.id}?token=${token}`, {});

    setIsDeleted(true);
    setTimeout(() => {
      setIsDeleted(false);
      router.push(`/events/${eventId}`);
    }, 3000);
  };

  if (isDeleted) {
    return (
      <FormSuccessFeedback>Deletion successful!</FormSuccessFeedback>
    );
  }

  if (isSubmitted) {
    return (
      <FormSuccessFeedback>Update successful!</FormSuccessFeedback>
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
