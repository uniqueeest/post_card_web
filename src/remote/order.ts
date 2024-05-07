import {
  QuerySnapshot,
  collection,
  limit,
  query,
  getDocs,
  startAfter,
} from 'firebase/firestore';

import { COLLECTIONS } from '@/constants';
import { OrderData } from '@models';
import { store } from './firebase';

export async function getOrders(pageParams?: QuerySnapshot<OrderData>) {
  const orderQuery =
    pageParams == null
      ? query(collection(store, COLLECTIONS.ORDER), limit(20))
      : query(
          collection(store, COLLECTIONS.ORDER),
          startAfter(pageParams),
          limit(20)
        );

  const orderSnapshot = await getDocs(orderQuery);

  const items = orderSnapshot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
      } as OrderData)
  );

  const lastVisible = orderSnapshot.docs[orderSnapshot.docs.length - 1];

  return {
    items,
    lastVisible,
  };
}
