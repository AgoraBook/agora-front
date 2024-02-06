import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { TextFields } from '../components/signup/text-fields';
import { CheckFields } from '../components/signup/check-fields';

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
    <div className='w-[350px]'>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(formValid, formInvalid)}>
          <TextFields showCode={showCode} setShowCode={setShowCode} />
          <CheckFields />
          <button type='submit'>Submit</button>
        </form>
      </FormProvider>
    </div>
  );
};
