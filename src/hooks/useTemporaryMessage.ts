import { useEffect, useState } from 'react';

export const useTemporaryMessage = (timeout = 4000) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (message) {
        setMessage('');
      }
    }, timeout);
    return () => clearTimeout(timer);
  }, [message]);

  return { message, setMessage };
};
