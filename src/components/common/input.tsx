import React from 'react';
import { CloseSVG } from '../../assets/icons/close';
import { PasswordSVG } from '../../assets/icons/password';
import { UserSVG } from '../../assets/icons/user';
import { useInputContext } from '../../hooks/useInputContext';
import { InputHTMLAttributes, PropsWithChildren, createContext } from 'react';

type InputType = 'default' | 'id' | 'password';

export type InputContextType = {
  inputType: InputType;
  hasReset: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const InputContext = createContext<InputContextType | undefined>(
  undefined
);

export const Input = ({
  inputType = 'default',
  hasReset = false,
  ...props
}: PropsWithChildren<InputContextType>) => {
  return (
    <div className='focus-within:border-mainColor flex w-full items-center rounded-[6px] border-[1.5px] border-solid border-[#ADB6BD] bg-white p-2.5 focus-within:border-[2px] '>
      <InputContext.Provider
        value={{
          inputType,
          hasReset,
          ...props,
        }}
      >
        {props.children}
      </InputContext.Provider>
    </div>
  );
};

const Icon = (): JSX.Element | null => {
  const { inputType } = useInputContext();
  return {
    default: null,
    id: <UserSVG />,
    password: <PasswordSVG />,
  }[inputType as InputType];
};

const InnerInput = () => {
  const { inputType, props } = useInputContext();
  return (
    <input
      className=' mx-[5px] flex-1 text-[15px] outline-none '
      type={inputType === 'password' ? 'password' : 'text'}
      {...props}
    />
  );
};

/** buttons */
const Reset = () => {
  return (
    <button onClick={() => console.log('asdf')}>
      <CloseSVG />
    </button>
  );
};

Input.Icon = Icon;
Input.InnerInput = InnerInput;
Input.Reset = Reset;
