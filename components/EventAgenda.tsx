import { formatDate } from '@/app/utils';
import { AgendaType } from '@/types/AgendaType';
import { ClockIcon } from '@heroicons/react/24/outline';
import { H5 } from './Headlines';
import { IconWithText } from './IconWithText';

export const EventAgenda = ({ agendaList }: { agendaList: AgendaType[] }) => {
  const formatType = 'time';

  return (
    <div className='grid gap-2'>
      {agendaList.map((agenda) => {
        return (
          <div className='bg-gray-50 rounded p-6' key={agenda.name}>
            <H5>{agenda.name}</H5>
            <IconWithText Icon={ClockIcon}>
              {formatDate(agenda.start, formatType)}{' '}
              {agenda.end ? ` - ${formatDate(agenda.end, formatType)}` : ''}
            </IconWithText>
            <div className='mt-6'>{agenda.description}</div>
          </div>
        );
      })}
    </div>
  );
};
