import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { TextFields } from '../components/signup/text-fields';
import { CheckFields } from '../components/signup/check-fields';
import { Header } from '../components/common/header';
import { AuthLayout } from '../components/layout/auth-layout';
import Button from '../components/common/button';

type FormInputs = {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
};

export const SignupPage = () => {
  const [showCode, setShowCode] = useState<boolean>(false);

  const methods = useForm<FormInputs>({
    shouldUseNativeValidation: false,
    mode: 'onBlur',
    criteriaMode: 'firstError',
  });

  const formValid = () => {
    if (!showCode)
      methods.setError('code', {
        type: 'empty',
        message: '이메일을 인증해주세요',
      });
    return;
  };
  const formInvalid = (errors: FieldErrors<FormInputs>) => {
    console.log(errors);
  };

  return (
    <AuthLayout>
      <Header text='회원가입' />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(formValid, formInvalid)}
          className='mt-[18px] flex flex-1 flex-col justify-between'
        >
          <TextFields
            className='flex flex-col gap-[15px]'
            showCode={showCode}
            setShowCode={setShowCode}
          />
          <CheckFields className='flex flex-col gap-[15px]' />
          <Button color='secondary' size='xl' type='submit'>
            완료
          </Button>
        </form>
      </FormProvider>
    </AuthLayout>
  );
};
