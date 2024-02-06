import { CheckSVG } from '../../assets/icons/check';
import {
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import { useFormContext } from 'react-hook-form';

type FieldProps = {
  text: string; // label
  isValid?: boolean;
  url?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Field = forwardRef(
  (
    { text, isValid, url, ...props }: FieldProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [checked, setChecked] = useState<boolean | null>(null);
    return (
      <>
        <div className=' flex items-center gap-2.5 text-[12px]'>
          <CheckSVG
            stroke={checked ? '#03878C' : !isValid ? '#ff0000' : '#ADB6BD'}
          />
          <label>
            <input
              type='checkbox'
              className='appearance-none'
              onClick={() => setChecked(!checked)}
              ref={ref}
              {...props}
            />
            {text}
          </label>
          {url && (
            <a
              className='text-[10px] text-[#7B7B7B] underline'
              href={url}
              target='_blank'
            >
              내용 보기
            </a>
          )}
        </div>
      </>
    );
  }
);

type CheckFieldsProps = {
  className?: string;
};

const FIELDS_NAME = 'agreement'; // register 인자로 들어갈 name

export const CheckFields = ({ className }: CheckFieldsProps) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  // text fields가 invalid한 경우, check fields는 invalid 표시가 나타나지 않도록 별도의 상태로 관리
  const [fieldValid, setFieldValid] = useState<boolean>();

  useEffect(() => {
    setFieldValid(
      !Object.keys(errors).includes(FIELDS_NAME) ||
        Object.keys(errors).length > 1
    );
    console.log(errors);
  }, [isSubmitting]);

  return (
    <div className={className}>
      <Field
        {...register(FIELDS_NAME, { required: true })}
        value='age'
        text='만 14세 이상입니다'
        isValid={fieldValid}
      />
      <Field
        {...register(FIELDS_NAME, { required: true })}
        value='service'
        text='서비스 약관에 동의합니다'
        isValid={fieldValid}
        url='http://www.naver.com'
      />
      <Field
        {...register(FIELDS_NAME, { required: true })}
        value='privacy'
        text='개인정보 수집 및 이용에 동의합니다'
        isValid={fieldValid}
        url='http://www.naver.com'
      />
    </div>
  );
};
