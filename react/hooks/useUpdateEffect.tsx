import { useEffect, useRef, DependencyList, EffectCallback } from "react";

/**
 * 除了首次渲染之外，每次依赖变化时才执行 effect， 不支持清理函数
 */
export function useUpdateEffect(effect: EffectCallback, deps: DependencyList) {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      effect();
    } else {
      isMounted.current = true;
    }
  }, deps);
}
