'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import { ParticipantService } from '@/service/events/ParticipantService';
import { ParticipantType } from '@/types/ParticipantType';
import FormSuccessFeedback from '@/components/Feedback';
import FormCheckbox from '@/components/FormCheckbox';

export default function Page({
  params,
}: {
  params: { eventId: string; participantId: string };
}) {
  const router = useRouter();
  const [participantData, setParticipantData] =
    useState<ParticipantType | null>({
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

  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const fetchParticipantData = async () => {
      const response = await ParticipantService(params.eventId).get(
        params.participantId,
      );
      setParticipantData({
        ...response.data,
        customData: response.data.customData ?? {
          tShirtSize: 'm',
          eventParticipation: false,
          foodPreference: 'Meat',
          jobDescription: '',
          companyName: '',
          awsExperience: '< 1 year',
        },
      });
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

            <FormInput
              as='select'
              value={participantData.customData.tShirtSize}
              onChange={(e) =>
                setParticipantData({
                  ...participantData,
                  customData: {
                    ...participantData.customData,
                    tShirtSize: e.target.value as
                      | 'm'
                      | 'xs'
                      | 's'
                      | 'l'
                      | 'xl'
                      | 'xxl'
                      | 'xxxl',
                  },
                })
              }
              required
            >
              <option value='xs'>XS</option>
              <option value='s'>S</option>
              <option value='m'>M</option>
              <option value='l'>L</option>
              <option value='xl'>XL</option>
              <option value='xxl'>XXL</option>
              <option value='xxxl'>XXXL</option>
            </FormInput>

            <FormCheckbox
              label='Participation at the evening event'
              id='eventParticipation'
              checked={participantData.customData.eventParticipation}
              onChange={(isChecked) =>
                setParticipantData({
                  ...participantData,
                  customData: {
                    ...participantData.customData,
                    eventParticipation: isChecked,
                  },
                })
              }
            />
            <FormInput
              as='select'
              value={participantData.customData.foodPreference}
              onChange={(e) =>
                setParticipantData({
                  ...participantData,
                  customData: {
                    ...participantData.customData,
                    foodPreference: e.target.value as
                      | 'Vegan'
                      | 'Vegetarian'
                      | 'Meat',
                  },
                })
              }
              required
            >
              <option value='Vegetarian'>Vegetarian</option>
              <option value='Vegan'>Vegan</option>
              <option value='Meat'>Meat</option>
            </FormInput>

            <FormInput
              type='text'
              value={participantData.customData.jobDescription}
              onChange={(e) =>
                setParticipantData({
                  ...participantData,
                  customData: {
                    ...participantData.customData,
                    jobDescription: e.target.value,
                  },
                })
              }
              placeholder='Your job description'
            />
            <FormInput
              type='text'
              value={participantData.customData.companyName}
              onChange={(e) =>
                setParticipantData({
                  ...participantData,
                  customData: {
                    ...participantData.customData,
                    companyName: e.target.value,
                  },
                })
              }
              placeholder='Your company name'
            />
            <FormInput
              as='select'
              value={participantData.customData.awsExperience}
              onChange={(e) =>
                setParticipantData({
                  ...participantData,
                  customData: {
                    ...participantData.customData,
                    awsExperience: e.target.value as
                      | '< 1 year'
                      | '1-3 years'
                      | '3-5 years'
                      | '5+ years',
                  },
                })
              }
            >
              <option value='< 1 year'>{'< 1 year'}</option>
              <option value='1-3 years'>1-3 years</option>
              <option value='3-5 years'>3-5 years</option>
              <option value='+5 years'>5+ years</option>
            </FormInput>

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
