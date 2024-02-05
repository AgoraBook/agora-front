import { InputHTMLAttributes, PropsWithChildren } from 'react';

export const Input = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex w-full items-center rounded-[6px] border-[1.5px] border-solid border-[#ADB6BD] bg-white p-2.5 focus-within:border-[2px] focus-within:border-mainColor '>
      {children}
    </div>
  );
};

const InnerInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input className=' mx-[5px] flex-1 text-[15px] outline-none ' {...props} />
  );
};
Input.InnerInput = InnerInput;
