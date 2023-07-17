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
  const [failedMessage, setFailedMessage] = useState('');
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
      awsExperience: '',
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await ParticipantService(eventId).add('', data);
    } catch (error) {
      let msg = 'Something went wrong, please try again later.';
      if (error.name === 'ConditionalCheckFailedException') {
        msg =
          'Registration failed. Please check your information and try again.';
      }
      setFailedMessage(msg);
      setTimeout(() => {
        setFailedMessage('');
      }, 3000);
      return;
    }

    onSubmit();

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  if (failedMessage) {
    return (
      <div className='w-full py-6'>
        <FormFailedFeedback>{failedMessage}</FormFailedFeedback>
      </div>
    );
  }

  return (
    <div className='w-full'>
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
