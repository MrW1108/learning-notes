import { useEffect } from 'react';
import { useLatest } from './useLatest';

/**
 * 组件卸载时执行
 * @param fn 
 */
export const useUnmount = fn => {
  const fnRef = useLatest(fn);

  useEffect(
    () => () => {
      fnRef.current();
    },
    []
  );
};
