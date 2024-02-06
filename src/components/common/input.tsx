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
  isValid?: boolean | null;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef(
  (
    {
      left,
      right,
      // isError,
      isValid = null,
      children,
      ...props
    }: PropsWithChildren<InputType>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div
        className={clsx(
          'focus-within:border-secondary flex w-full items-center rounded-[6px] border-[1.5px] border-solid  bg-white p-2.5 focus-within:border-[2px] ',
          isValid === null
            ? 'border-[#ADB6BD]'
            : isValid
              ? '!border-secondary'
              : '!border-error'
        )}
      >
        {left}
        <input
          ref={ref}
          className={clsx(
            left && 'ml-[5px]',
            right && 'mr-[5px]',
            'flex-1 appearance-none text-[15px] outline-none'
          )}
          {...props}
        />
        {right}
      </div>
    );
  }
);
