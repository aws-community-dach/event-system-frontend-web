import Link from 'next/link';
import Button from './Button';

export default function CheckinButton({
  eventId,
  className = '',
}: {
  eventId: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Link className='text-link' href={`/events/${eventId}/checkin`}>
        <Button type='button' color='secondary'>
          Checkin
        </Button>
      </Link>
    </div>
  );
}
