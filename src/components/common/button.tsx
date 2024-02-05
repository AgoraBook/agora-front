import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: 'main' | 'secondary' | 'destructive';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'wide';
}

const sizes = {
  xs: 'text-xs px-3 py-2',
  sm: 'text-sm px-4 py-2',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-4 py-2',
  xl: 'text-xl px-4 py-2',
  wide: 'w-full px-1 py-2',
};

const colors = {
  main: 'border-Main bg-Main text-White ',
  secondary: 'bg-Seondarytext-Main',
  destructive:
    'border-Red bg-Red text-White hover:border-RedHover hover:bg-RedHover',
};

const Button: React.FunctionComponent<IButtonProps> = ({
  children,
  color,
  size,
  disabled,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        `${className} flex transform select-none items-center justify-center gap-2 rounded-md border text-lg
        transition-all active:scale-95
        `,
        disabled
          ? 'text-DisabledColor pointer-events-none border-transparent bg-gray-300'
          : colors[color],
        sizes[size]
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
