import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

type FeedbackProps = {
  title?: string;
  children?: React.ReactNode;
};

type BaseFeedbackProps = {
  title: string;
  children?: React.ReactNode;
  color: 'info' | 'success' | 'danger';
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const colorClasses = {
  info: 'text-info-700 border-info bg-info-50',
  danger: 'text-danger-700 border-danger bg-danger-50',
  success: 'text-success-700 border-success bg-success-50',
};

const BaseFeedback = ({ title, children, color, Icon }: BaseFeedbackProps) => {
  const baseFeedbackClasses = `${colorClasses[color]} border rounded p-4 mt-6`;

  return (
    <div className={baseFeedbackClasses} role='alert'>
      <div className='flex flex-row'>
        <Icon className={`h-6 w-6 mr-2 ${colorClasses[color]}`} />
        <h5>{title}</h5>
      </div>
      {children && <div className='pt-4'>{children}</div>}
    </div>
  );
};

export default function FormSuccessFeedback({ children }: FeedbackProps) {
  return (
    <div className='w-full text-center mb-6'>
      <CheckCircleIcon className='h-12 w-12 text-success mx-auto mt-4' />
      {children}
    </div>
  );
}

export const SuccessFeedback = ({ title, children }: FeedbackProps) => (
  <BaseFeedback
    title={title || ''}
    children={children}
    color='success'
    Icon={CheckCircleIcon}
  />
);

export const ErrorFeedback = ({ title, children }: FeedbackProps) => (
  <BaseFeedback
    title={title || ''}
    children={children}
    color='danger'
    Icon={ExclamationCircleIcon}
  />
);

export const InfoFeedback = ({ title, children }: FeedbackProps) => (
  <BaseFeedback
    title={title || ''}
    children={children}
    color='info'
    Icon={InformationCircleIcon}
  />
);
