import { FieldErrors, useForm } from 'react-hook-form';
import { Input } from '../components/common/input';
import { ErrorMessage } from '../components/common/error-message';
import { useState } from 'react';

type FormInputName = 'email' | 'code' | 'password' | 'confirmPassword';

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
    setError,
    formState: { errors, touchedFields },
  } = useForm<FormInputs>({
    shouldUseNativeValidation: false,
    mode: 'onBlur',
  });

  const formValid = (data: FormInputs) => {
    if (!showCode)
      setError('code', { type: 'empty', message: '이메일을 인증해주세요' });
    console.log(data);
  };
  const formInvalid = (errors: FieldErrors<FormInputs>) => {
    console.log(errors);
  };

  // 바로 필드의 유효성을 검사
  const fieldValid = async (field: FormInputName) =>
    await trigger(field, { shouldFocus: true });

  // 유효한 필드의 보더 스타일을 유지하기 위한 검사
  const fieldValidStyle = (field: FormInputName) => {
    if (!touchedFields[field]) return null;
    if (touchedFields[field] && !Object.keys(errors).includes(field))
      return true;
    return false;
  };

  return (
    <div className='w-[350px]'>
      <form onSubmit={handleSubmit(formValid, formInvalid)}>
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
          isValid={fieldValidStyle('email') && !(errors.code?.type === 'empty')}
          placeholder='이메일'
          right={
            <button
              type='button' // submit 방지
              onClick={async () => {
                const isValid = await fieldValid('email');
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
        {
          <ErrorMessage>
            {errors.email?.message ||
              (errors.code?.type === 'empty' && errors.code.message)}
          </ErrorMessage>
        }

        {showCode && !errors.email && (
          <Input
            {...register('code', {
              required: true,
              validate: () => true || '인증번호가 일치하지 않습니다', // TODO: 인증코드 대조 로직
            })}
            type='number'
            placeholder='인증번호'
            isValid={fieldValidStyle('code')}
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
          isValid={fieldValidStyle('password')}
        />
        <Input
          {...register('confirmPassword', {
            required: true,
            validate: (value, formValues) =>
              value === formValues.password || '비밀번호가 일치하지 않습니다',
          })}
          isValid={fieldValidStyle('confirmPassword')}
          type='password'
          placeholder='비밀번호 확인'
        />
        {<ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>}

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};
