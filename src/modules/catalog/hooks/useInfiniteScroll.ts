import { useRef, useCallback } from 'react';

export function useInfiniteScroll(onLoadMore: () => void, hasMore: boolean) {
  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef(false);

  const triggerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && !loadingRef.current) {
            loadingRef.current = true;
            onLoadMore();

            setTimeout(() => {
              loadingRef.current = false;
            }, 200);
          }
        },
        {
          rootMargin: '300px', // preload early
        }
      );

      if (node) observer.current.observe(node);
    },
    [hasMore, onLoadMore]
  );

  return triggerRef;
}
