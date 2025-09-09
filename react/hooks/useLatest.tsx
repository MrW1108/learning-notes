import { useRef } from "react";

/**
 * 始终保持一个最新值的 ref , 常用于闭包中获取最新值
 */
export function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}
