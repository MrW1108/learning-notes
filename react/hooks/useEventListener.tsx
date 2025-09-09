import * as React from "react";
import { useLatest } from "./useLatest";

const { useEffect } = React;

type EventListenerOptions = {
  target?: Window | Document | HTMLElement;
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
};

/**
 * 事件注册，支持扩展 target
 * @param eventName
 * @param handler
 * @param options
 */
export function useEventListener<
  K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap
>(
  eventName: string,
  handler: (event: HTMLElementEventMap[K] | any) => void,
  options: EventListenerOptions = {}
) {
  const handlerRef = useLatest(handler);

  useEffect(() => {
    const targetElement = options.target ?? window;

    const eventListener = (event: Event) => handlerRef.current(event);

    targetElement.addEventListener(eventName, eventListener, {
      capture: options.capture,
      once: options.once,
      passive: options.passive,
    });

    return () => {
      targetElement.removeEventListener(eventName, eventListener, {
        capture: options.capture,
      });
    };
  }, [
    eventName,
    options.capture,
    options.once,
    options.passive,
    options.target,
  ]);
}
