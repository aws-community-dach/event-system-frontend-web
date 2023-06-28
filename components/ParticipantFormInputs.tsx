'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from './Button';
import FormCheckbox from '@/components/FormCheckbox';
import FormInput from '@/components/FormInput';
import { ParticipantType } from '@/types/ParticipantType';

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
      <form className='w-full lg:space-y-6' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          label='Anzeigename'
          value={data.displayName}
          onChange={(e) =>
            handleChange({
              ...data,
              displayName: e.target.value,
            })
          }
          required
        />

        <FormInput
          type='text'
          label='Name'
          value={data.name}
          onChange={(e) => handleChange({ ...data, name: e.target.value })}
          required
        />

        {isNewParticipant && (
          <FormInput
            id='email'
            name='email'
            label='E-Mail'
            type='email'
            value={data.email}
            onChange={(e) => handleChange({ ...data, email: e.target.value })}
            autoComplete='email'
            required
          />
        )}

        <FormInput
          as='select'
          label='T-Shirt Größe'
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
          label='Beteiligung am Event?'
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
          label='Essenspräferenz'
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
          <option value='Vegetarian'>Vegetarisch</option>
          <option value='Vegan'>Vegan</option>
          <option value='Meat'>Fleisch</option>
        </FormInput>

        <FormInput
          type='text'
          label='Job Beschreibung'
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
        />
        <FormInput
          type='text'
          label='Firma'
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
        />
        <FormInput
          as='select'
          label='AWS Erfahrung'
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
          <option value='< 1 year'>{'< 1 Jahr'}</option>
          <option value='1-3 years'>1-3 Jahre</option>
          <option value='3-5 years'>3-5 Jahre</option>
          <option value='+5 years'>5+ Jahre</option>
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
