'use client';

import { useEffect, useState } from 'react';
import { ParticipantType } from '@/types/ParticipantType';
import FormInput from '@/components/FormInput';
import FormCheckbox from '@/components/FormCheckbox';
import Button from './Button';
import Link from 'next/link';

type FormInputsProps = {
  participantData?: ParticipantType;
  isNewParticipant?: boolean;
  handleDataChange: (newData: ParticipantType) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleDelete?: () => void;
  eventId: string;
};

export default function ParticipantFormInputs({
  eventId,
  participantData,
  isNewParticipant = false,
  handleDataChange,
  handleSubmit = () => {},
  handleDelete = () => {},
}: FormInputsProps) {
  const [data, setData] = useState<ParticipantType>(
    participantData || {
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
    },
  );

  useEffect(() => {
    if (participantData) {
      setData(participantData);
    }
  }, [participantData]);

  const handleChange = (newData: ParticipantType) => {
    setData(newData);
    handleDataChange(newData);
  };

  return (
    <div>
      <form className='w-full' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          value={data.displayName}
          onChange={(e) =>
            handleChange({
              ...data,
              displayName: e.target.value,
            })
          }
          placeholder='Your display name'
          required
        />

        <FormInput
          type='text'
          value={data.name}
          onChange={(e) => handleChange({ ...data, name: e.target.value })}
          placeholder='Your name'
          required
        />

        {!isNewParticipant && (
          <FormInput
            id='email'
            name='email'
            type='email'
            value={data.email}
            onChange={(e) => handleChange({ ...data, email: e.target.value })}
            placeholder='E-Mail'
            autoComplete='email'
            required
          />
        )}

        <FormInput
          as='select'
          value={data.customData.tShirtSize}
          onChange={(e) =>
            setData({
              ...data,
              customData: {
                ...data.customData,
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
          checked={data.customData.eventParticipation}
          onChange={(isChecked) =>
            setData({
              ...data,
              customData: {
                ...data.customData,
                eventParticipation: isChecked,
              },
            })
          }
        />
        <FormInput
          as='select'
          value={data.customData.foodPreference}
          onChange={(e) =>
            setData({
              ...data,
              customData: {
                ...data.customData,
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
          value={data.customData.jobDescription}
          onChange={(e) =>
            setData({
              ...data,
              customData: {
                ...data.customData,
                jobDescription: e.target.value,
              },
            })
          }
          placeholder='Your job description'
        />
        <FormInput
          type='text'
          value={data.customData.companyName}
          onChange={(e) =>
            setData({
              ...data,
              customData: {
                ...data.customData,
                companyName: e.target.value,
              },
            })
          }
          placeholder='Your company name'
        />
        <FormInput
          as='select'
          value={data.customData.awsExperience}
          onChange={(e) =>
            setData({
              ...data,
              customData: {
                ...data.customData,
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

        {isNewParticipant && (
          <>
            <p className='mt-4 text-sm leading-6 text-gray-600'>
              Es gelten die Datenschutzbestimmungen
            </p>
            <div className='mt-6 flex items-center justify-end gap-x-6'>
              <Button className='w-full' type='submit'>
                Registrieren
              </Button>
            </div>
            <div className='mt-5'>
              <div>Bereits registiert?</div>
              <div>
                <Link
                  className='text-link'
                  href={`/events/${eventId}/participants/edit`}
                >
                  <Button type='button' className='w-full' color='secondary'>
                    Daten ändern
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}

        {!isNewParticipant && (
          <div className='flex gap-2'>
            <Button type='submit'>Update Registration</Button>
            <Button color='danger' onClick={handleDelete}>
              Delete Registration
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
