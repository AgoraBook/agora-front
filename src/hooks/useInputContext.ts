import { useContext } from 'react';

import { IInputContext, InputContext } from '../components/common/input';

export const useInputContext = () => {
  const context = useContext<IInputContext | undefined>(InputContext);
  if (context === undefined)
    throw new Error('usePostCardView must be used within a <Input />');
  return context;
};
