'use client';

import { useState } from 'react';
import { ParticipantType } from '@/types/ParticipantType';
import { ParticipantService } from '@/service/events/ParticipantService';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';

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
  ParticipantService(eventId).update(participant.id, { ...participant });
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

  const handleVerification = async () => {
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

  const handleUpdate = async () => {
    if (participant) {
      await updateParticipantRegistration(params.eventId, participant);
      setId('');
      setEmail('');
      setParticipant(null);
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
      {errorMessage && <div>{errorMessage}</div>}
      {participant ? (
        <>
          <h2>Edit your registration</h2>
          <FormInput
            type='text'
            value={participant.name}
            onChange={(e) =>
              setParticipant({ ...participant, name: e.target.value })
            }
            placeholder='Your name'
          />
          <FormInput
            type='text'
            value={participant.displayName}
            onChange={(e) =>
              setParticipant({ ...participant, displayName: e.target.value })
            }
            placeholder='Your display name'
          />
          <Button onClick={handleUpdate}>Update Registration</Button>
          <Button color='danger' onClick={handleDelete}>
            Delete Registration
          </Button>
        </>
      ) : (
        <>
          <FormInput
            type='text'
            value={participantId}
            onChange={(e) => setId(e.target.value)}
            placeholder='Your ID'
          />
          <FormInput
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Your email'
          />
          <Button onClick={handleVerification}>Verify</Button>
        </>
      )}
    </>
  );
}
