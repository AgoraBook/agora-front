import { useEffect, useState } from 'react';

import { useModeStore } from './stores/mode-store';

import * as dayjs from 'dayjs';
import 'dayjs/locale/ko';

import { faker } from '@faker-js/faker';

import clsx from 'clsx';
import { useQuery } from '@tanstack/react-query';
import { getDog } from './services/dog';

import { motion } from 'framer-motion';

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
        'flex h-[100dvh] items-center justify-center',
        mode === 'light' ? 'bg-white text-black' : 'bg-[#20212C] text-white'
      )}
    >
      <div
        className={clsx(
          'flex h-[80%] w-[90%] flex-col items-center justify-center gap-4 rounded-xl',
          mode === 'light' ? 'bg-[#E4EBFA]' : 'bg-[#000112]'
        )}
      >
        <h1 className='text-2xl font-bold'>Hello Agora Git branch test~</h1>
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
          className='rounded-lg bg-[#635FC7] px-2 py-3 font-bold text-white'
        >
          {mode === 'light' ? '라이트 🤓' : '다크 😎'}
        </button>
        <hr />

        <div className='flex gap-x-8'>
          <div>
            <h2>React Query 테스트</h2>
            {query.isLoading && 'loading...'}
            {query.isSuccess && (
              <img
                src={query.data.message}
                alt='dog'
                className='aspect-square max-w-48 rounded-lg'
              />
            )}
          </div>
          <div>
            <h2>Framer 테스트</h2>
            <motion.div
              className='ml-10 mt-16 w-fit text-5xl'
              animate={{
                translateY: -50,
                rotate: [180, 360],
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                repeatType: 'reverse',
                bounce: 10,
                bounceDamping: 20,
              }}
            >
              🏀
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
