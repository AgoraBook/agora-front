import { CloseSVG } from '../../assets/icons/close';
import { PasswordSVG } from '../../assets/icons/password';
import { UserSVG } from '../../assets/icons/user';
import { ChangeEvent, InputHTMLAttributes, PropsWithChildren } from 'react';
import { Input } from '../common/input';

export type InputContextType = {
  isPassword?: boolean;
  onChange: (value: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const LoginInput = ({
  isPassword = false,
  onChange,
  ...props
}: PropsWithChildren<InputContextType>) => {
  return (
    <Input>
      {!isPassword ? <UserSVG /> : <PasswordSVG />}
      <Input.InnerInput
        type={isPassword ? 'password' : 'text'}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        {...props}
      />
      <div onClick={() => onChange('')}>
        <CloseSVG />
      </div>
    </Input>
  );
};
