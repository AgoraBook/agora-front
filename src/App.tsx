import { useEffect, useState } from 'react';

import { useModeStore } from './stores/mode-store';

import * as dayjs from 'dayjs';
import 'dayjs/locale/ko';

import { faker } from '@faker-js/faker';

import clsx from 'clsx';
import { useQuery } from '@tanstack/react-query';
import { getDog } from './services/dog';

function App() {
  const { mode, changeMode } = useModeStore((state) => state);
  const [now, setNow] = useState<string>('');
  const [avatar, setAvatar] = useState<{
    randomName: string;
    randomImage: string;
    randomEmail: string;
  }>({
    randomName: '',
    randomImage: '',
    randomEmail: '',
  });

  const handleClick = () => {
    if (mode === 'light') changeMode('dark');
    else changeMode('light');
  };

  useEffect(() => {
    setTimeout(() => {
      const today = dayjs(new Date());
      setNow(today.format('HH:mm:ss'));

      const randomName = faker.person.fullName(); // Rowan Nikolaus
      const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
      const randomImage = faker.image.avatar();
      setAvatar({
        randomName,
        randomImage,
        randomEmail,
      });
    }, 1000);
  }, [now, avatar]);

  // Queries
  const query = useQuery({ queryKey: ['todos'], queryFn: getDog });

  return (
    <main
      className={clsx(
        'flex items-center justify-center  h-[100dvh]',
        mode === 'light' ? 'bg-white text-black' : 'bg-[#20212C] text-white'
      )}
    >
      <div
        className={clsx(
          'flex flex-col items-center justify-center w-[90%] h-[80%] rounded-xl gap-4',
          mode === 'light' ? 'bg-[#E4EBFA]' : 'bg-[#000112]'
        )}
      >
        <h1 className='text-2xl font-bold'>Hello Agora</h1>
        <time>지금은 몇시 인가요? {now}</time>
        <div className='flex flex-col items-center'>
          <img
            src={avatar.randomImage}
            alt='avatar'
            className='w-12 rounded-full'
          />
          <p>{avatar.randomName}</p>
          <p>{avatar.randomEmail}</p>
        </div>
        <button
          onClick={handleClick}
          className='bg-[#635FC7] px-2 py-3 rounded-lg text-white font-bold'
        >
          {mode === 'light' ? '라이트 🤓' : '다크 😎'}
        </button>
        <hr />
        <h2>React Query 테스트</h2>
        {query.isLoading && 'loading...'}
        {query.isSuccess && (
          <img
            src={query.data.message}
            alt='dog'
            className='aspect-square rounded-lg max-w-48'
          />
        )}
      </div>
    </main>
  );
}

export default App;
