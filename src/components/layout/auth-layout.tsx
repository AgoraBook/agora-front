import clsx from 'clsx';
import { LogoSVG } from '../../assets/icons/logo';
import { HTMLAttributes, PropsWithChildren } from 'react';

export const AuthLayout = ({
  className,
  children,
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div className='m-auto flex h-screen w-screen items-center justify-around bg-gray-900'>
      <LogoSVG />
      <div
        className={clsx(
          'relative flex h-[600px] w-[765px] flex-col rounded-[30px] bg-white px-[200px] py-[30px]',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
