import { formatDate } from '@/app/utils';
import { CalendarIcon, ClockIcon, MapIcon } from '@heroicons/react/24/outline';
import { IconWithText } from './IconWithText';

export const EventDetails = ({
  date,
  location,
}: {
  date: string;
  location: string;
}) => {
  return (
    <div className='py-3 sm:flex text-gray-500'>
      <div className='flex flex-col'>
        <IconWithText Icon={CalendarIcon}>
          {formatDate(date, 'date')}
        </IconWithText>
        <IconWithText Icon={ClockIcon}>{formatDate(date, 'time')}</IconWithText>
        <IconWithText Icon={MapIcon}>{location}</IconWithText>
      </div>
    </div>
  );
};
