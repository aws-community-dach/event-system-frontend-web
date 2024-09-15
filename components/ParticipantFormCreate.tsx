'use client';

import { useState } from 'react';
import { FormFailedFeedback, FormSuccessFeedback } from './Feedback';
import ParticipantFormInputs from './ParticipantFormInputs';
import { ParticipantService } from '@/service/events/ParticipantService';
import {
  defaultParticipantDataObject,
  ParticipantDataType,
} from '@/types/ParticipantType';

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
  const [data, setData] = useState<ParticipantDataType>(
    defaultParticipantDataObject,
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await ParticipantService(eventId).add({ id: '', data: data });
    } catch (error: any) {
      let msg = 'Something went wrong, please try again later.';

      switch (error.status) {
        case 400:
          msg = 'Please check your data and try again.';
          break;
        case 401:
          msg = 'You need to login to perform this operation.';
          break;
        case 500:
          msg = 'There was a problem with the server. Please try again later.';
          break;
        default:
          break;
      }

      setFailedMessage(msg);
      setTimeout(() => {
        setFailedMessage('');
      }, 3000);
      return;
    }

    onSubmit();

    setIsSubmitted(true);
    setData(defaultParticipantDataObject);

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
