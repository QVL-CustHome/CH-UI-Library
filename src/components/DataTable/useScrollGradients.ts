import { useCallback, useEffect, useRef, useState } from "react";

export interface UseScrollGradientsResult {
  scrollRef: (node: HTMLElement | null) => void;
  scrollEl: HTMLElement | null;
  topOpacity: number;
  bottomOpacity: number;
}

export function useScrollGradients(enabled: boolean): UseScrollGradientsResult {
  const [scrollEl, setScrollEl] = useState<HTMLElement | null>(null);
  const [topOpacity, setTopOpacity] = useState(0);
  const [bottomOpacity, setBottomOpacity] = useState(0);
  const elRef = useRef<HTMLElement | null>(null);

  const update = useCallback(() => {
    const el = elRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const maxScroll = scrollHeight - clientHeight;
    setTopOpacity(maxScroll <= 0 ? 0 : Math.min(scrollTop / 50, 1));
    setBottomOpacity(maxScroll <= 0 ? 0 : Math.min((maxScroll - scrollTop) / 50, 1));
  }, []);

  const scrollRef = useCallback(
    (node: HTMLElement | null) => {
      elRef.current = node;
      setScrollEl(node);
      if (node) update();
    },
    [update],
  );

  useEffect(() => {
    if (!enabled) return;
    const el = elRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [enabled, scrollEl, update]);

  return { scrollRef, scrollEl, topOpacity, bottomOpacity };
}
