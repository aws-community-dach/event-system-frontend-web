'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import { ParticipantService } from '@/service/events/ParticipantService';
import { ParticipantType } from '@/types/ParticipantType';
import FormSuccessFeedback, { ErrorFeedback } from '@/components/Feedback';

async function verifyParticipant(
  eventId: string,
  email: string,
  participantId: string,
): Promise<ParticipantType | null> {
  try {
    const res = await ParticipantService(eventId).get(participantId);

    const participant = res.data;

    if (participant.email !== email) {
      return null;
    }

    return participant;
  } catch (err) {
    if (err.response?.status === 404) {
      return null;
    }
    throw err;
  }
}

async function updateParticipantRegistration(
  eventId: string,
  participant: ParticipantType,
) {
  await ParticipantService(eventId).update(participant.id, { ...participant });
}

export default function ParticipantUpdateForm({
  params,
}: {
  params: { eventId: string };
}) {
  const [participantId, setId] = useState<string | ''>('');
  const [email, setEmail] = useState('');
  const [participant, setParticipant] = useState<ParticipantType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const [showFeedback, setShowFeedback] = useState(false);

  const handleVerification = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (participantId !== '') {
      const verifiedParticipant = await verifyParticipant(
        params.eventId,
        email,
        participantId,
      );
      if (verifiedParticipant) {
        setParticipant(verifiedParticipant);
        setErrorMessage(null);
      } else {
        setErrorMessage('Participant not found or email does not match.');
      }
    }
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (participant) {
      await updateParticipantRegistration(params.eventId, participant);
      setId('');
      setEmail('');
      setParticipant(null);

      setShowFeedback(true);

      setTimeout(() => {
        router.push(`/events/${params.eventId}`);
      }, 2000);
    }
  };

  const handleDelete = async () => {
    if (participant) {
      await ParticipantService(params.eventId).delete(participant.id, {});
      setId('');
      setEmail('');
      setParticipant(null);
    }
  };

  return (
    <>
      <h1>Update your Registration</h1>
      {errorMessage && <ErrorFeedback title={errorMessage} />}
      {showFeedback ? (
        <FormSuccessFeedback>
          Daten erfolgreich aktualisiert
        </FormSuccessFeedback>
      ) : participant ? (
        <>
          <h2>Edit your registration</h2>
          <form className='w-full' onSubmit={handleUpdate}>
            <FormInput
              type='text'
              value={participant.name}
              onChange={(e) =>
                setParticipant({ ...participant, name: e.target.value })
              }
              placeholder='Your name'
              required
            />
            <FormInput
              type='text'
              value={participant.displayName}
              onChange={(e) =>
                setParticipant({ ...participant, displayName: e.target.value })
              }
              placeholder='Your display name'
              required
            />
            <div className='flex gap-2'>
              <Button type='submit'>Update Registration</Button>

              <Button color='danger' onClick={handleDelete}>
                Delete Registration
              </Button>
            </div>
          </form>
        </>
      ) : (
        <form className='w-full' onSubmit={handleVerification}>
          <FormInput
            type='text'
            value={participantId}
            onChange={(e) => setId(e.target.value)}
            placeholder='Your ID'
            required
          />
          <FormInput
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Your email'
            required
          />
          <Button type='submit'>Verify</Button>
        </form>
      )}
    </>
  );
}
