'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from './Button';
import Spinner from './Spinner';
import FormCheckbox from '@/components/FormCheckbox';
import FormInput from '@/components/FormInput';
import { ParticipantType } from '@/types/ParticipantType';

type FormInputsProps = {
  participantData?: ParticipantType;
  isNewParticipant?: boolean;
  handleDataChange: (newData: ParticipantType) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleDelete?: () => void;
  eventId: string;
};

export default function ParticipantFormInputs({
  eventId,
  participantData,
  isNewParticipant = false,
  handleDataChange,
  handleSubmit = async () => {},
  handleDelete = () => {},
}: FormInputsProps) {
  const [data, setData] = useState<ParticipantType>(
    participantData || {
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
    },
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (participantData) {
      setData(participantData);
    }
  }, [participantData]);

  useEffect(() => {
    handleDataChange(data);
  }, [data, handleDataChange]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    await handleSubmit(event);
    setIsSubmitting(false);
  };

  return (
    <div>
      {isSubmitting ? (
        <div className='py-5 flex justify-center items-center'>
          <Spinner className='h-12 w-12' />
        </div>
      ) : (
        <form className='w-full lg:space-y-6' onSubmit={onSubmit}>
          <FormInput
            type='text'
            label='Name on badge'
            placeholder='Max'
            value={data.displayName}
            onChange={(e) =>
              setData({
                ...data,
                displayName: e.target.value,
              })
            }
            required
          />

          <FormInput
            type='text'
            label='Name'
            placeholder='Max Mustermann'
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />

          {isNewParticipant && (
            <FormInput
              id='email'
              name='email'
              label='E-Mail'
              placeholder='max.mustermann@company.de'
              type='email'
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              autoComplete='email'
              required
            />
          )}

          <FormInput
            as='select'
            label='Shirt size'
            value={data.customData.tShirtSize}
            onChange={(e) =>
              setData({
                ...data,
                customData: {
                  ...data.customData,
                  tShirtSize: e.target.value as
                    | 'fxs'
                    | 'fs'
                    | 'fm'
                    | 'fl'
                    | 'xs'
                    | 's'
                    | 'm'
                    | 'l'
                    | 'xl'
                    | 'xxl'
                    | 'xxxl',
                },
              })
            }
            required
          >
            <option value='fxs'>XS (female cut)</option>
            <option value='fs'>S (female cut)</option>
            <option value='fm'>M (female cut)</option>
            <option value='fl'>L (female cut)</option>
            <option value='xs'>XS</option>
            <option value='s'>S</option>
            <option value='m'>M</option>
            <option value='l'>L</option>
            <option value='xl'>XL</option>
            <option value='xxl'>XXL</option>
            <option value='xxxl'>XXXL</option>
          </FormInput>

          <FormInput
            as='select'
            label='Food preference'
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

          <FormCheckbox
            label='Participation at the evening event'
            id='eveningEventParticipation'
            checked={data.customData.eveningEventParticipation}
            onChange={(isChecked) =>
              setData({
                ...data,
                customData: {
                  ...data.customData,
                  eveningEventParticipation: isChecked,
                },
              })
            }
          />
          <FormInput
            type='text'
            label='User Group'
            value={data.customData.userGroup}
            onChange={(e) =>
              setData({
                ...data,
                customData: {
                  ...data.customData,
                  userGroup: e.target.value,
                },
              })
            }
          />
          <FormInput
            type='text'
            label='Job description'
            placeholder='Cloud Engineer'
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
            label='Company'
            placeholder='Example GmbH'
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
            label='AWS experience'
            value={data.customData.awsExperience}
            onChange={(e) =>
              setData({
                ...data,
                customData: {
                  ...data.customData,
                  awsExperience: e.target.value as
                    | ''
                    | '< 1 year'
                    | '1-3 years'
                    | '3-5 years'
                    | '5+ years',
                },
              })
            }
          >
            <option value=''>---</option>
            <option value='< 1 year'>{'< 1 year'}</option>
            <option value='1-3 years'>1-3 years</option>
            <option value='3-5 years'>3-5 years</option>
            <option value='+5 years'>5+ years</option>
          </FormInput>

          {isNewParticipant && (
            <>
              <p className='mt-4 text-sm leading-6 text-gray-600'>
                The{' '}
                <a href='https://www.aws-community.de/privacy' target='_blank'>
                  privacy policy
                </a>{' '}
                applies
              </p>
              <div className='mt-6 flex items-center justify-end gap-x-6'>
                <Button type='submit'>Register</Button>
              </div>
              <div className='mt-5'>
                <div>Already registered?</div>
                <div>
                  <Link
                    className='text-link'
                    href={`/events/${eventId}/participants/edit`}
                  >
                    <Button type='button' className='w-full' color='secondary'>
                      Update data
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
      )}
    </div>
  );
}
