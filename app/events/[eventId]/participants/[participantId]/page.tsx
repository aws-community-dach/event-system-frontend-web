'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import { ParticipantService } from '@/service/events/ParticipantService';
import { ParticipantType } from '@/types/ParticipantType';
import FormSuccessFeedback from '@/components/Feedback';

function Page({
  params,
}: {
  params: { eventId: string; participantId: string };
}) {
  const router = useRouter();
  const [participantData, setParticipantData] =
    useState<ParticipantType | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const fetchParticipantData = async () => {
      const response = await ParticipantService(params.eventId).get(
        params.participantId,
      );
      setParticipantData(response.data);
    };

    fetchParticipantData();
  }, [params.eventId, params.participantId]);

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (participantData) {
      await ParticipantService(params.eventId).update(participantData.id, {
        ...participantData,
      });
      setShowFeedback(true);
      setTimeout(() => {
        router.push(`/events/${params.eventId}`);
      }, 2000);
    }
  };

  const handleDelete = async () => {
    if (participantData) {
      await ParticipantService(params.eventId).delete(participantData.id, {});
    }
  };

  if (!participantData) return <div>Loading...</div>; // Add loading state

  return (
    <>
      <h1>Update your Registration</h1>
      {showFeedback ? (
        <FormSuccessFeedback>
          Daten erfolgreich aktualisiert
        </FormSuccessFeedback>
      ) : (
        <>
          <h2>Edit your registration</h2>
          <form className='w-full' onSubmit={handleUpdate}>
            <FormInput
              type='text'
              value={participantData.displayName}
              onChange={(e) =>
                setParticipantData({
                  ...participantData,
                  displayName: e.target.value,
                })
              }
              placeholder='Your display name'
              required
            />

            <FormInput
              type='text'
              value={participantData.name}
              onChange={(e) =>
                setParticipantData({ ...participantData, name: e.target.value })
              }
              placeholder='Your name'
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
      )}
    </>
  );
}

export default Page;
