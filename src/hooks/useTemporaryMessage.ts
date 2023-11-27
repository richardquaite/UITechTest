import { useEffect, useState } from 'react';

export const useTemporaryMessage = (timeout = 4000) => {
  const [temporaryMessage, setTemporaryMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (temporaryMessage) {
        setTemporaryMessage('');
      }
    }, timeout);
    return () => clearTimeout(timer);
  }, [temporaryMessage]);

  return { temporaryMessage, setTemporaryMessage };
};
