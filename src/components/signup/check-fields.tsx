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
    { text, isValid = true, url, ...props }: FieldProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [checked, setChecked] = useState<boolean>(false);
    return (
      <>
        <div className=' flex items-center gap-2.5 text-[12px]'>
          <div onClick={() => setChecked(!checked)}>
            <CheckSVG
              stroke={checked ? '#03878C' : !isValid ? '#ff0000' : '#ADB6BD'}
            />
          </div>
          <label>
            <input
              type='checkbox'
              className='appearance-none'
              checked={checked}
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

const AGREEMENTS = ['age', 'service', 'privacy'];

export const CheckFields = ({ className }: CheckFieldsProps) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  // text fields (사용자 정보) 가 invalid한 경우,
  // check fields (동의 항목) 는 invalid 표시가 나타나지 않도록 별도의 상태로 관리
  const [fieldValid, setFieldValid] = useState<boolean>(true);

  useEffect(() => {
    const disagreements = AGREEMENTS.map((a) =>
      Object.keys(errors).includes(a)
    ).filter((a) => a);
    setFieldValid(
      !Object.keys(errors).length ||
        disagreements.length !== Object.keys(errors).length
    );
    console.log(Object.keys(errors).length, disagreements.length);
  }, [isSubmitting]);

  return (
    <div className={className}>
      <Field
        {...register(AGREEMENTS[0], { required: true })}
        value={AGREEMENTS[0]}
        text='만 14세 이상입니다'
        isValid={fieldValid}
      />
      <Field
        {...register(AGREEMENTS[1], { required: true })}
        value={AGREEMENTS[1]}
        text='서비스 약관에 동의합니다'
        isValid={fieldValid}
        url='http://www.naver.com'
      />
      <Field
        {...register(AGREEMENTS[2], { required: true })}
        value={AGREEMENTS[2]}
        text='개인정보 수집 및 이용에 동의합니다'
        isValid={fieldValid}
        url='http://www.naver.com'
      />
    </div>
  );
};
