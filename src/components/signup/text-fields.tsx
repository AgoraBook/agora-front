import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '../common/error-message';
import { Input } from '../common/input';
import { Dispatch, SetStateAction } from 'react';

type TextFieldName = 'email' | 'code' | 'password' | 'confirmPassword';

type TextFieldsProps = {
  showCode: boolean;
  setShowCode: Dispatch<SetStateAction<boolean>>;
};

export const TextFields = ({ showCode, setShowCode }: TextFieldsProps) => {
  const {
    register,
    trigger,
    formState: { errors, touchedFields },
  } = useFormContext();

  // 바로 필드의 유효성을 검사
  const fieldValid = async (field: TextFieldName) =>
    await trigger(field, { shouldFocus: true });

  // 유효한 필드의 보더 스타일을 유지하기 위한 검사
  const fieldValidStyle = (field: TextFieldName) => {
    if (!touchedFields[field]) return null;
    if (touchedFields[field] && !Object.keys(errors).includes(field))
      return true;
    return false;
  };

  return (
    <>
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
          <>
            {errors.email?.message ||
              (errors.code?.type === 'empty' && errors.code.message)}
          </>
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
      {
        <ErrorMessage>
          <>{errors.confirmPassword?.message}</>
        </ErrorMessage>
      }
    </>
  );
};
