'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FormSuccessFeedback, FormFailedFeedback } from './Feedback';
import ParticipantFormInputs from './ParticipantFormInputs';
import { ParticipantService } from '@/service/events/ParticipantService';
import { ParticipantType, ParticipantDataType } from '@/types/ParticipantType';

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
  const [data, setData] = useState<ParticipantDataType>(participantData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (participantData) {
      setData(participantData);
    }
  }, [participantData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await ParticipantService(eventId).update({
        id: participantData.id,
        data: data,
        params: {
          email: participantData.email,
        },
      });
      setIsSubmitted(true);
    } catch (error) {
      setIsFailed(true);
    }

    setTimeout(() => {
      router.push(`/events/${eventId}`);
    }, 3000);
  };

  const handleDelete = async () => {
    await ParticipantService(eventId).delete({
      id: participantData.id,
      params: { email: participantData.email },
    });

    setIsDeleted(true);
    setTimeout(() => {
      setIsDeleted(false);
      router.push(`/events/${eventId}`);
    }, 3000);
  };

  if (isDeleted) {
    return <FormSuccessFeedback>Deletion successful!</FormSuccessFeedback>;
  }

  if (isSubmitted) {
    return <FormSuccessFeedback>Update successful!</FormSuccessFeedback>;
  }

  if (isFailed) {
    return (
      <FormFailedFeedback>
        Something went wrong here! Please try again later again.
      </FormFailedFeedback>
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
