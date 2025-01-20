// hooks/usePrimogems.ts
import { useState, useEffect } from 'react';

export const usePrimogems = (): [number, React.Dispatch<React.SetStateAction<number>>] => {
  const [primogems, setPrimogems] = useState<number>(32000);

  useEffect(() => {
    const storedPrimogems = localStorage.getItem('primogems');
    if (storedPrimogems) {
      setPrimogems(Number(storedPrimogems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('primogems', primogems.toString());
  }, [primogems]);

  return [primogems, setPrimogems];
};
