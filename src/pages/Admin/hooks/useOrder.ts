import { useCallback } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { getOrders } from '@/remote/order';

export const useOrders = () => {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useSuspenseInfiniteQuery({
    queryKey: ['ORDER'],
    queryFn: ({ pageParam }) => {
      return getOrders(pageParam);
    },
    initialPageParam: undefined,
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible as any;
    },
  });

  const loadMore = useCallback(() => {
    if (!hasNextPage || isFetching) {
      return;
    }
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  const orders = data?.pages.map(({ items }) => items).flat();

  return { data: orders, loadMore, isFetching, hasNextPage };
};
