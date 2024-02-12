import { PropsWithChildren } from 'react';

export const ErrorMessage = ({ children }: PropsWithChildren) => {
  return <span className='text-error text-[11px]'>{children}</span>;
};
