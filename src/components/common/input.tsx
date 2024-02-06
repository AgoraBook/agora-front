import clsx from 'clsx';
import {
  ForwardedRef,
  InputHTMLAttributes,
  PropsWithChildren,
  ReactNode,
  forwardRef,
} from 'react';

type InputType = {
  left?: ReactNode;
  right?: ReactNode;
  isError?: boolean;
  isValid?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef(
  (
    {
      left,
      right,
      isError,
      isValid,
      children,
      ...props
    }: PropsWithChildren<InputType>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div
        className={clsx(
          isValid && 'border-secondary',
          isError && 'border-error',
          'focus-within:border-secondary flex w-full items-center rounded-[6px] border-[1.5px] border-solid border-[#ADB6BD] bg-white p-2.5 focus-within:border-[2px] '
        )}
      >
        {left}
        <input
          ref={ref}
          className={clsx(
            left && 'ml-[5px]',
            right && 'mr-[5px]',
            ' flex-1 text-[15px] outline-none '
          )}
          {...props}
        />
        {right}
      </div>
    );
  }
);
