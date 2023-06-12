import React from 'react';

interface IconWithTextProps {
  Icon: React.ElementType;
  size?: number;
  children: React.ReactNode;
}

export const IconWithText: React.FC<IconWithTextProps> = ({
  Icon,
  size = 20,
  children,
}) => {
  return (
    <div className='flex items-center space-x-4'>
      <Icon height={size} />
      <p>{children}</p>
    </div>
  );
};
