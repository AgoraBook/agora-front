import { FieldErrors, SubmitErrorHandler, useForm } from 'react-hook-form';
import { Input } from '../components/common/input';
import { ErrorMessage } from '../components/common/error-message';
import { useState } from 'react';

type FormInputs = {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
};

export const SignupPage = () => {
  const [showCode, setShowCode] = useState<boolean>();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormInputs>({ shouldUseNativeValidation: false });

  const onValid = (data: FormInputs) => {
    console.log(data);
  };
  const onInvalid = (data: FieldErrors<FormInputs>) => {
    console.log(data);
  };

  return (
    <div className='350px'>
      <form onSubmit={handleSubmit(onValid, onInvalid)}>
        <Input
          {...register('email', {
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: '이메일 형식이 아닙니다',
            },
            validate: {
              checkDupEmail: () => true || '중복된 이메일입니다', // TODO: 이메일 중복 확인 api
            },
          })}
          placeholder='이메일'
          right={
            <button
              type='button' // submit 방지
              onClick={async () => {
                const isValid = await trigger('email', {
                  shouldFocus: true,
                });
                setShowCode(isValid);
                if (!isValid) return;
                // TODO: 인증 요청 api 호출
              }}
              className='bg-secondary rounded-[3px] px-1.5 py-1 text-[10px] text-white'
            >
              인증
            </button>
          }
        />
        {<ErrorMessage>{errors.email?.message}</ErrorMessage>}

        {showCode && !errors.email && (
          <Input
            {...register('code', { required: true })}
            type='number'
            placeholder='인증번호'
            // TODO: 타이머 로직
            right={
              <div className='text-error text-[12px] tabular-nums'>04:29</div>
            }
          />
        )}
        <Input
          {...register('password', {
            required: true,
          })}
          type='password'
          placeholder='비밀번호'
        />
        <Input
          {...register('confirmPassword', {
            required: true,
            validate: (value, formValues) =>
              value === formValues.password || '비밀번호가 일치하지 않습니다',
          })}
          type='password'
          placeholder='비밀번호 확인'
        />
        {<ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>}

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};
