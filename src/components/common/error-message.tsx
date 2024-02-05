type ErrorMessage = {
  isError: boolean;
  message: string;
};
export const ErrorMessage = ({ isError, message }: ErrorMessage) => {
  if (!isError) return null;
  return <span className='text-error text-[11px]'>{message}</span>;
};
