'use client';
import { useState, useEffect } from 'react';
import { ParticipantService } from '@/service/events/ParticipantService';
import { ParticipantType } from '@/types/ParticipantType';
import ParticipantForm from '@/components/ParticpantForm';

export default function Page({
  params,
}: {
  params: { eventId: string; participantId: string };
}) {
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

  if (!participantData) return <div>Loading...</div>; // Add loading state

  return (
    <>
      <h1>Update your Registration</h1>
      <>
        <ParticipantForm
          participantData={participantData}
          eventId={params.eventId}
          isEditMode={true}
        />
      </>
    </>
  );
}
