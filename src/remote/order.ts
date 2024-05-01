import {
  QuerySnapshot,
  collection,
  limit,
  query,
  getDocs,
  startAfter,
} from 'firebase/firestore';

import { COLLECTIONS } from '@/constants';
import { OrderValue } from '@models';
import { store } from './firebase';

export async function getOrders(pageParams?: QuerySnapshot<OrderValue>) {
  const orderQuery =
    pageParams == null
      ? query(collection(store, COLLECTIONS.ORDER), limit(10))
      : query(
          collection(store, COLLECTIONS.ORDER),
          startAfter(pageParams),
          limit(10)
        );

  const orderSnapshot = await getDocs(orderQuery);

  const items = orderSnapshot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
      } as OrderValue)
  );

  const lastVisible = orderSnapshot.docs[orderSnapshot.docs.length - 1];

  return {
    items,
    lastVisible,
  };
}
