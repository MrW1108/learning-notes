import { useRef, useCallback } from "react";
import { useUnmount } from "@/hooks";
import { useLatest } from "./useLatest";

type TimeoutHook = {
  start: () => void;
  stop: () => void;
};

/**
 * 定时器 Hook，组件卸载时自动清理
 * @param fn 处理器
 * @param delay 延时（ms）
 * @param isInterval 是否循环执行
 */
export function useTimeout(
  fn: () => void,
  delay: number,
  isInterval = false
): TimeoutHook {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fnRef = useLatest(fn); // 使用 useLatest 保证闭包获取最新 fn

  const start = useCallback(() => {
    stop(); // 避免重复计时
    timerRef.current = setTimeout(() => {
      fnRef.current();

      if (isInterval) {
        start(); // 循环执行
      }
    }, delay);
  }, [delay, isInterval, fnRef]);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useUnmount(stop);

  return { start, stop };
}
