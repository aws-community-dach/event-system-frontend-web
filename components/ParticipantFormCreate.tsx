'use client';

import { useState } from 'react';
import { FormFailedFeedback, FormSuccessFeedback } from './Feedback';
import ParticipantFormInputs from './ParticipantFormInputs';
import { ParticipantService } from '@/service/events/ParticipantService';
import { ParticipantType } from '@/types/ParticipantType';

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
  const [isFailed, setIsFailed] = useState(false);
  const [data, setData] = useState<ParticipantType>({
    name: '',
    displayName: '',
    email: '',
    customData: {
      tShirtSize: 'l',
      eveningEventParticipation: false,
      foodPreference: 'Meat',
      userGroup: '',
      jobDescription: '',
      companyName: '',
      awsExperience: '< 1 year',
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await ParticipantService(eventId).add('', data);
    } catch (error) {
      if (error.code === 'ERR_BAD_RESPONSE') {
        setIsFailed(true);
        return;
      }
    }

    onSubmit();

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className='w-full'>
      {isFailed && (
        <div className=''>
          <FormFailedFeedback>E-Mail already registered</FormFailedFeedback>
        </div>
      )}
      {isSubmitted ? (
        <FormSuccessFeedback>You are registered!</FormSuccessFeedback>
      ) : (
        <>
          <div className={className}>
            <ParticipantFormInputs
              participantData={data}
              handleDataChange={setData}
              handleSubmit={handleSubmit}
              isNewParticipant={true}
              eventId={eventId}
            />
          </div>
        </>
      )}
    </div>
  );
}
