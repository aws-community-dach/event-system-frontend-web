'use client';

import { useState } from 'react';
import { ParticipantType } from '@/types/ParticipantType';
import { ParticipantService } from '@/service/events/ParticipantService';
import ParticipantFormInputs from './ParticipantFormInputs';
import FormSuccessFeedback from './Feedback';

export default function ParticipantFormCreate({
  eventId,
  className = '',
  onSubmit = () => {},
}: {
  eventId: string;
  className?: string;
  onSubmit?: () => void;
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    onSubmit();

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <>
      {isSubmitted ? (
        <FormSuccessFeedback>Erfolgreich angemeldet</FormSuccessFeedback>
      ) : (
        <div className={className}>
          <ParticipantFormInputs
            participantData={data}
            handleDataChange={setData}
            handleSubmit={handleSubmit}
            isNewParticipant={true}
            eventId={eventId}
          />
        </div>
      )}
    </>
  );
}
